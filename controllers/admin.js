const Products = require("../models/product");
exports.getProduct = (req, res) => {
  res.render("admin/add-product", {
    Heading: "Add Product",
    active: "add-product",
  });
};
exports.listProducts = (req, res) => {
  Products.fetchProduct((product) => {
    res.render("admin/product", {
      prod: product,
      Heading: "Admin Shop",
      active: "admin-products",
    });
  });
};
exports.postProduct = (req, res) => {
  const products = new Products(
    ({ title, cost, image, description } = req.body)
  );
  products.save();
  res.redirect("products");
};
