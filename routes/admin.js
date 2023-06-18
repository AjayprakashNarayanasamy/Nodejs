const express = require("express");
const products = require("../controllers/admin");
const router = express.Router();
router.get("/add-product", products.getProduct);
// Admin Fetch Product 
router.get("/products",products.listProducts)
router.post("/add-product", products.postProduct);
//Admin Edit Product
router.get("/edit-product/:productId", products.getEditProduct)
// Admin post the edited product
router.post("/edit-product",products.postEditedProduct)
// Admin  delete product
router.post("/delete-product",products.postDeleteProduct )
exports.routes = router;
