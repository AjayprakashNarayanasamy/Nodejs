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
  Products.findAll()
    .then((product) => {
      res.render("admin/product", {
        prod: product,
        Heading: "Admin Shop",
        active: "admin-products",
      });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Product Creation for admin and the entire application
exports.postProduct = (req, res) => {
  Products.create({
    title: req.body.title,
    cost: req.body.cost,
    image: req.body.image,
    description: req.body.description,
  })
    .then((val) => {
      console.log(val);
      res.redirect("/products")
    })
    .catch((err) => {
      console.log(err);
    });
};
//Admin Edit Product
exports.getEditProduct = (req, res) => {
  const editMode = req.query.edit;
  if (!editMode) {
    return res.redirect("/");
  }
  const prodId = req.params.productId;
  Products.findByPk(prodId)
    .then((product) => {
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
    })
    .catch((err) => {
      console.log("Error in admin product Edit", err);
    });
};
//Admin Update Product
exports.postEditedProduct = (req, res) => {
  const { id, title, cost, image, description } = req.body;
  Products.update(
    { title, cost, image, description },
    {
      where: {
        id,
      },
    }
  ).then((success)=>{
    console.log("Admin Update Succes")
    res.redirect("/products");
  }).catch((err)=>{
    console.log("Admin updation failed" , err)
  })
};
//Admin Delete Producr
exports.postDeleteProduct = (req, res) => {
  const deleteProductId = req.body.id;
  Products.destroy({where:{
    id:deleteProductId
  }}).then((success)=>{
    console.log("Admin Deleted the product successfully",success)
    res.redirect("/products")
  }).catch((err)=>{
    console.log("Admin product not deleted Successfully",err)
  })


 
};
