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
} = require("../controllers/user-controller");

const router = express.Router();

router.use(authMiddleware("USER"));
router.get("/verify", asyncRouteHandler(verify));

router.get("/category", asyncRouteHandler(getCategories));

router.post("/interest", asyncRouteHandler(addInterest));
router.get("/interest", asyncRouteHandler(getInterests));
router.delete("/interest/:id", asyncRouteHandler(removeInterest));

router.post("/blog", asyncRouteHandler(createBlog));

module.exports = router;
