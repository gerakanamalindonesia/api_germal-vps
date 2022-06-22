const express = require("express");
const {
  getAllSubCategories,
} = require("../controllers/subcategory.controller");
const router = express.Router();

router.get("/", getAllSubCategories);

module.exports = router;
