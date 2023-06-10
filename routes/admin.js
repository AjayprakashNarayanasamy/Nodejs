const express = require("express");
const products = require("../controllers/admin");
const router = express.Router();
router.get("/add-product", products.getProduct);
router.get("/products",products.listProducts)
router.post("/add-product", products.postProduct);
exports.routes = router;
