const express = require("express");
const path = require("path");
const rootdir = require("../utils/path")

// console.log("express" , express)
// console.log("express" , express())
const router = express.Router();

router.get("/add-product", (req, res) => {
  console.log("Text");
  res.sendFile(path.join(rootdir, "views", "add-product.html"));
});
router.post("/add-product", (req, res) => {
  console.log(req.body);
  res.redirect("/");
});
module.exports = router;
