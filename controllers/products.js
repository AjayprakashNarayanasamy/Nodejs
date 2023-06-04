const Products = require("../models/product")
exports.getProduct = (req, res) => {
  res.render("add-product", { Heading: "Add Product", active: "add-product" });
};
exports.postProduct = (req, res) => {
console.log(req.body)
  const products = new Products(req.body)
  products.save()
  res.redirect("/");
};
exports.showProduct = (req, res) => {
 Products.fetchProduct(product =>{
    res.render("shop", {
      prod: product,
      Heading: "Shop",
      active: "view-product",
    });
})
 
};
