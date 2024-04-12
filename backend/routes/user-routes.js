const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { asyncRouteHandler } = require("../utils/router-utils");
const { verify } = require("../controllers/common-controller");
const {
  addInterest,
  removeInterest,
  getInterests,
  getCategories,
  createBlog,
  addProfileImage,
  dashboard,
  getBlogs,
  getAllPublicBlogs,
} = require("../controllers/user-controller");
const { multerConfig } = require("../utils/upload-files-utils");

const router = express.Router();

router.use(authMiddleware("USER"));
router.get("/verify", asyncRouteHandler(verify));

router.get("/dashboard", asyncRouteHandler(dashboard));

router.post("/profileImage", multerConfig.single("profileImage"), asyncRouteHandler(addProfileImage));

router.get("/category", asyncRouteHandler(getCategories));

router.post("/interest", asyncRouteHandler(addInterest));
router.get("/interest", asyncRouteHandler(getInterests));
router.delete("/interest/:id", asyncRouteHandler(removeInterest));

router.post("/blog", asyncRouteHandler(createBlog));
router.get("/blog", asyncRouteHandler(getBlogs));
router.get("/blog/public", asyncRouteHandler(getAllPublicBlogs));

module.exports = router;
