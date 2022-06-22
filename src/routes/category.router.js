const express = require("express");
const {
  getAllCategory,
  addNewCategory,
  getCategoryWithStatus,
  getDetailCategory,
  deleteCategory,
  updateCategory,
} = require("../controllers/category.controller");
const upload = require("../util/multer");
const router = express.Router();

router.get("/", getAllCategory);
router.get("/status", getCategoryWithStatus);
router.get("/:id", getDetailCategory);

router.post("/", upload.single("image"), addNewCategory);

router.patch(
  "/:id",
  upload.single("image") ? upload.single("image") : "",
  updateCategory
);

router.delete("/:id", deleteCategory);

module.exports = router;
