const categoriesModel = require("../models/categories");
const { CustomError } = require("../utils/router-utils");
const { ok200 } = require("../utils/response-utils");
const { uploadFile } = require("../utils/upload-files-utils");
const mongoose = require("mongoose");

async function addCategory(req, res, next) {
  const { name } = req.body;
  if (!name || !req.file) {
    throw new CustomError("Invalid Request", 400);
  }

  const result = await uploadFile(
    req.file.buffer,
    req.file.originalname,
    "blog-categories"
  );
  const { public_id, secure_url } = result;

  const category = new categoriesModel({
    name,
    categoryImg: {
      public_id,
      public_url: secure_url,
    },
  });

  await category.save();
  ok200(res);
}

async function deleteCategory(req, res, next) {
  const id = req.params.id;
  if (!mongoose.isValidObjectId(id)) {
    throw new CustomError("Invalid Request", 400);
  }
  const category = await categoriesModel.findOne({ _id: id, is_active: 1 });
  if (!category) {
    throw new CustomError("No Category Found!!", 400);
  }
  category.is_active = 0;
  await category.save();
  ok200(res);
}

async function editCategory(req, res, next) {
  const { id } = req.params;
  const { name } = req.body;

  if (!mongoose.isValidObjectId(id) || !name) {
    throw new CustomError("Invalid Request", 400);
  }
  const category = await categoriesModel.findOne({ _id: id, is_active: 1 });
  if (!category) {
    throw new CustomError("No Category Found!!", 400);
  }
  category.name = name;

  if (req.file) {
    const result = await uploadFile(
      req.file.buffer,
      req.file.originalname,
      "blog-categories"
    );
    const { public_id, public_url } = result;
    category.categoryImg.public_id = public_id;
    category.categoryImg.public_url = public_url;
  }

  await category.save();

  ok200(res);
}

async function getCategories(req, res, next) {
  const categories = await categoriesModel.find({ is_active: 1 });
  ok200(res, { categories });
}

module.exports = { addCategory, deleteCategory, editCategory, getCategories };
