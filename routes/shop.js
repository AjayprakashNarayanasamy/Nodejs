const express = require("express")
const router = express.Router()
const products = require("../controllers/shop")
// Index Page to get all the products available for the customer
router.get("/", products.index ) 
// Get the product by id to get product description
router.get("/description/:productId",products.productDescription)
// Post the cart product added to the cart
router.post("/cart",products.postCart)
// display all the products
router.get("/products", products.showProduct)
// display all the products in the cart
router.get("/cart",products.cart)
router.get("/checkout",products.checkout)
// Post all the products in cart
router.post("/create-order",products.createOrder)
// display all the products in order
router.get("/orders",products.orders)
router.post("/cart-delete-item",products.deleteCartItem)
module.exports = router