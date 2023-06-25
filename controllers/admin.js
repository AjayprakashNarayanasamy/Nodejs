const Products = require("../models/product");

// Add form Page for the Admin
exports.getProduct = (req, res) => {
  res.render("admin/edit-product", {
    Heading: "Add Product",
    active: "add-product",
    editMode: "false",
  });
};
// Admin Fetch Product
exports.listProducts = (req, res) => {
  Products.fetchProduct()
    .then(([product, bufferData]) => {
      res.render("admin/product", {
        prod: product,
        Heading: "Admin Shop",
        active: "admin-products",
      });
    })
    .catch();
};
exports.postProduct = (req, res) => {

  const products = new Products(req.body.id,req.body.title,req.body.cost,req.body.image,req.body.description);
  products
    .save()
    .then((val) => res.redirect("products"))
    .catch((err) => console.log(err));
};
//Admin Edit Product
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;

  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;

  Products.fetchProductById(prodId, (product) => {
    if (!product) {
      return res.redirect("/");
    }
    res.render("admin/edit-product", {
      Heading: "Add Product",
      active: "edit-product",
      editing: "true",
      editMode: editMode,
      product: product,
    });
  });
};
exports.postEditedProduct = (req, res) => {
  const products = new Products(
    ({ id, title, cost, image, description } = req.body)
  );
  products.save();
  res.redirect("/products");
};
exports.postDeleteProduct = (req, res) => {
  const deleteProductId = req.body.id;

  Products.delete(deleteProductId);
  res.redirect("/products");
};
