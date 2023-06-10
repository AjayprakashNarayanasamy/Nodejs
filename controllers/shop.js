const Products = require("../models/product");
exports.index = (req, res) => {
  res.render("shop/index", {
    Heading: "Shop",
    active: "Index",
  });
};
exports.showProduct = (req, res) => {
  Products.fetchProduct((product) => {
    res.render("shop/product", {
      prod: product,
      Heading: "Shop",
      active: "view-product",
    });
  });
  
};
exports.cart = (req, res) => {
  res.render("shop/cart", {
    Heading: "Cart",
    active: "cart",
  });
};
exports.checkout = (req, res) => {
  res.render("shop/checkout", {
    Heading: "Checkout",
    active: "checkout",
  });
};
exports.orders = (req , res) =>{
  res.render("shop/orders",{
    Heading:"Orders",
    active:"orders"
  })

}

