const express = require("express");
const products = require("../controllers/products");
const router = express.Router();
router.get("/add-product", products.getProduct);
router.post("/add-product", products.postProduct);
exports.routes = router;
