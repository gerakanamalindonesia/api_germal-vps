const express = require("express");
const {
  getAllCategory,
  addNewCategory,
  getCategoryWithStatus,
  getDetailCategory,
} = require("../controllers/category.controller");
const upload = require("../util/multer");
const router = express.Router();

router.get("/", getAllCategory);
router.get("/status", getCategoryWithStatus);
router.get("/:id", getDetailCategory);

router.post("/", upload.single("image"), addNewCategory);

module.exports = router;
