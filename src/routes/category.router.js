const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  return res.send("Hello category syar'i with me");
});

module.exports = router;
