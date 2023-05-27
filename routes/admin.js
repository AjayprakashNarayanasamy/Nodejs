const express = require("express");
const path = require("path");
const rootdir = require("../utils/path");
const { Module } = require("module");

// console.log("express" , express)
// console.log("express" , express())
const router = express.Router();
const arr = []

router.get("/add-product", (req, res) => {
  console.log("Text");
   res.render("add-product" , {Heading:"Add Product" , active:"add-product" })
});
router.post("/add-product", (req, res) => {
  
  arr.push(req.body)
  console.log(arr)
  res.redirect("/");
});
exports.routes = router;
exports.product = arr;
