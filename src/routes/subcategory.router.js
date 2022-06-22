const express = require("express");
const router = express.Router();

router.get("/", getAllSubCategories);

module.exports = router;
