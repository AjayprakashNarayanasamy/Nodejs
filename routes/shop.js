const express = require("express")
const router = express.Router()
const products = require("../controllers/shop")
router.get("/", products.index )
router.get("/products", products.showProduct)
router.get("/cart",products.cart)
router.get("/checkout",products.checkout)
router.get("/orders",products.orders)
module.exports = router