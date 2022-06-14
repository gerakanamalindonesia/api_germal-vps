const express = require("express");
const router = express.Router();

router.get("/", (_, res) => {
  return res.send("Hello category gerakanamal");
});

module.exports = router;
