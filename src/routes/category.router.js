const express = require("express");
const {
  getAllCategory,
  addNewCategory,
} = require("../controllers/category.controller");
const upload = require("../util/multer");
const router = express.Router();

router.get("/", getAllCategory);

router.post("/", upload.single("image"), addNewCategory);

module.exports = router;
