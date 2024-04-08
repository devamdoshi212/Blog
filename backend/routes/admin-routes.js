const express = require("express");
const { authMiddleware } = require("../middlewares/auth-middleware");
const { asyncRouteHandler } = require("../utils/router-utils");
const { verify } = require("../controllers/common-controller");
const { multerConfig } = require("../utils/upload-files-utils");
const { addCategory, deleteCategory, editCategory, getCategories } = require("../controllers/admin-controller");

const router = express.Router();

router.use(authMiddleware('ADMIN'));
router.get("/verify", asyncRouteHandler(verify));

router.post('/category', multerConfig.single('imageFile'), asyncRouteHandler(addCategory));
router.delete('/category/:id', asyncRouteHandler(deleteCategory));
router.patch('/category/:id',multerConfig.single('imageFile'),asyncRouteHandler(editCategory));
router.get('/category', asyncRouteHandler(getCategories));

module.exports = router;