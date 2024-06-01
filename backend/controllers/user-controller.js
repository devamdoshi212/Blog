const { CustomError } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const mongoose = require("mongoose");
const usersModel = require("../models/users");
const categoriesModel = require("../models/categories");
const blogsModel = require("../models/blogs");
const { uploadFile } = require("../utils/upload-files-utils");

async function dashboard(req, res, next) {
  const userData = res.locals.userData;
  const user = await usersModel.findOne({ _id: userData._id });
  const blogsCount = await blogsModel.countDocuments({
    author: new mongoose.Types.ObjectId(userData._id),
    is_active: 1,
  });

  ok200(res, { blogsCount, user });
}

async function addInterest(req, res, next) {
  const { interestIds } = req.body;
  if (interestIds.length === 0) {
    throw new CustomError("Invalid Request", 400);
  }
  const userData = res.locals.userData;
  const interestArr = interestIds.map((id) => new mongoose.Types.ObjectId(id));

  const user = await usersModel.findOneAndUpdate(
    { _id: userData._id, is_active: 1 },
    { $addToSet: { interests: { $each: interestArr } } }
  );

  ok200(res);
}

async function removeInterest(req, res, next) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("Invalid Request", 400);
  }
  const userData = res.locals.userData;
  const interest = await usersModel.findOneAndUpdate(
    { _id: userData._id, is_active: 1 },
    { $pull: { interests: new mongoose.Types.ObjectId(id) } }
  );
  if (!interest) {
    throw new CustomError("Invalid User !!", 400);
  }
  ok200(res);
}

async function getInterests(req, res, next) {
  const userData = res.locals.userData;
  const user = await usersModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userData._id) } },
    {
      $lookup: {
        from: "categories",
        localField: "interests",
        foreignField: "_id",
        as: "interests",
        pipeline: [{ $project: { name: 1, categoryImg: 1 } }],
      },
    },
    { $project: { interests: 1 } },
  ]);
  ok200(res, { user: user[0] });
}

async function getCategories(req, res, next) {
  const categories = await categoriesModel.find({ is_active: 1 });
  ok200(res, { categories });
}

async function createBlog(req, res, next) {
  const { title, content, category, is_public } = req.body;
  if (!title || !content || category.length === 0 || is_public == undefined) {
    throw new CustomError("Invalid Request", 400);
  }
  let image = {};
  const result = await uploadFile(
    req.file.buffer,
    req.file.originalname,
    "blogs-images"
  );
  image.public_id = result.public_id;
  image.public_url = result.secure_url;

  const categoryArr = JSON.parse(category).map(
    (id) => new mongoose.Types.ObjectId(id)
  );

  const userData = res.locals.userData;
  const blog = new blogsModel({
    title,
    content,
    is_public,
    author: new mongoose.Types.ObjectId(userData._id),
    category: categoryArr,
    is_public,
    image,
  });
  await blog.save();

  ok200(res);
}

async function editblog(req, res, next) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("Invalid Request", 400);
  }
  const { data } = req.body;
  const { title, content, category, is_public } = JSON.parse(data);
  if (!title || !content || category.length === 0 || is_public == undefined) {
    throw new CustomError("Invalid Request", 400);
  }
  const categoryArr = category.map((id) => new mongoose.Types.ObjectId(id));

  const userData = res.locals.userData;
  const blog = await blogsModel.findOneAndUpdate(
    {
      _id: id,
      author: new mongoose.Types.ObjectId(userData._id),
      is_active: 1,
    },
    {
      title,
      content,
      category: categoryArr,
      is_public,
      updated_at: Date.now(),
    }
  );

  ok200(res);
}

async function deleteBlog(req, res, next) {
  const { id } = req.params;
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("Invalid Request", 400);
  }
  const userData = res.locals.userData;
  const blog = await blogsModel.findOneAndUpdate(
    {
      _id: id,
      author: new mongoose.Types.ObjectId(userData._id),
      is_active: 1,
    },
    {
      is_active: 0,
    }
  );
  ok200(res);
}
async function getSingleBlog(req, res, next) {
  const blogId = req.params.id;

  const blog = await blogsModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(blogId) } },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
      },
    },
    {
      $lookup: {
        from: "comments",
        localField: "comments",
        foreignField: "_id",
        as: "comments",
      },
    },
    {
      $project: {
        title: 1,
        content: 1,
        created_at: 1,
        updated_at: 1,
        author: { $arrayElemAt: ["$author", 0] },
        category: 1,
        comments: 1,
        is_public: 1,
        is_active: 1,
      },
    },
  ]);

  if (blog.length === 0) {
    throw new CustomError("Blog not found", 400);
  }
  ok200(res, blog[0]);
}
async function getBlogs(req, res, next) {
  const userData = res.locals.userData;

  const blogs = await blogsModel.aggregate([
    {
      $match: {
        author: new mongoose.Types.ObjectId(userData._id),
        is_active: 1,
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [{ $project: { name: 1 } }],
      },
    },
  ]);

  ok200(res, { blogs });
}

async function getAllPublicBlogs(req, res, next) {
  const userData = res.locals.userData;
  const user = await usersModel.aggregate([
    { $match: { _id: new mongoose.Types.ObjectId(userData._id) } },
    {
      $lookup: {
        from: "categories",
        localField: "interests",
        foreignField: "_id",
        as: "interests",
        pipeline: [{ $project: { _id: 1 } }],
      },
    },
    { $project: { interests: 1 } },
  ]);

  const interests = user[0].interests.map((interest) => interest._id);

  const blogs = await blogsModel.aggregate([
    {
      $match: {
        category: { $in: interests },
        author: { $ne: new mongoose.Types.ObjectId(userData._id) },
        is_public: 1,
        is_active: 1,
      },
    },
    {
      $lookup: {
        from: "users",
        localField: "author",
        foreignField: "_id",
        as: "author",
        pipeline: [
          { $project: { username: 1, fullname: 1, email: 1, profile: 1 } },
        ],
      },
    },
    {
      $lookup: {
        from: "categories",
        localField: "category",
        foreignField: "_id",
        as: "category",
        pipeline: [{ $project: { name: 1 } }],
      },
    },
    { $unwind: "$author" },
  ]);

  ok200(res, { blogs });
}

async function addProfileImage(req, res, next) {
  if (!req.file) {
    throw new CustomError("Invalid Request", 400);
  }

  let profileImage = {};
  const result = await uploadFile(
    req.file.buffer,
    req.file.originalname,
    "profile-images"
  );
  profileImage.public_id = result.public_id;
  profileImage.public_url = result.secure_url;

  const userData = res.locals.userData;
  const user = await usersModel.findOneAndUpdate(
    { _id: userData._id, is_active: 1 },
    { $set: { profile: profileImage } }
  );

  ok200(res);
}

module.exports = {
  dashboard,
  addInterest,
  removeInterest,
  getInterests,
  getCategories,
  createBlog,
  editblog,
  deleteBlog,
  getBlogs,
  getAllPublicBlogs,
  addProfileImage,
  getSingleBlog,
};
