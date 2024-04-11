const { CustomError } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const mongoose = require("mongoose");
const usersModel = require("../models/users");
const categoriesModel = require("../models/categories");
const blogsModel = require("../models/blogs");
const { uploadFile } = require("../utils/upload-files-utils");

async function dashboard(req, res, next) {
  const userData = res.locals.userData;
  
  const blogsCount = await blogsModel.countDocuments({
    author: new mongoose.Types.ObjectId(userData._id),
    is_active: 1,
  });

  ok200(res, { blogsCount });
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
        pipeline: [{ $project: { name: 1 } }],
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
  const { data } = req.body;
  const { title, content, categories, is_public } = JSON.parse(data);
  if (!title || !content || categories.length === 0 || is_public == undefined) {
    throw new CustomError("Invalid Request", 400);
  }

  const categoriesArr = categories.map((id) => new mongoose.Types.ObjectId(id));

  const userData = res.locals.userData;
  const blog = new blogsModel({
    title,
    content,
    author: new mongoose.Types.ObjectId(userData._id),
    category: categoriesArr,
  });
  await blog.save();

  ok200(res);
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
  addProfileImage,
};
