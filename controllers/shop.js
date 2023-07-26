const Products = require("../models/product");
const CartClass = require("../models/cart");
// Inital Fetching of all products Index Page
exports.index = (req, res) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/index", {
        prod: products,
        Heading: "Shop",
        active: "productList",
      });
    })
    .catch((err) => {
      console.log("Fetching all the Products for User", err);
    });
};
// Fetch Based on Id for the purpose of the description
exports.productDescription = (req, res) => {
  Products.findByPk(req.params.productId)
    .then((product) => {
      res.render("shop/product-detail", {
        product: product,
        Heading: "Product Description",
        active: null,
      });
    })
    .catch((err) => console.log("Error in get product by ID for cutomer", err));
};
// Fetching of all the product
exports.showProduct = (req, res) => {
  Products.findAll()
    .then((products) => {
      res.render("shop/product", {
        prod: products,
        Heading: "Shop",
        active: "view-product",
      });
    })
    .catch(() => {});
};
//Adding value to the Cart
exports.postCart = (req, res) => {
  let userCart;
  req.user
    .getCart()
    .then((cart) => {
      userCart = cart;
      console.log(JSON.stringify(cart), "JSON.stringify(cart)");

      userCart
        .getProducts({ where: { id: req.body.productId } })
        .then((product) => {
          let uniqueProduct;
          console.log(product, "uniqueProductuniqueProduct");
          if (product.length > 0) {
            uniqueProduct = product[0];
          }
          let newQuantity = 1;
          if (uniqueProduct) {
            console.log(
              uniqueProduct.cartitem.quantity + 1,
              " uniqueProduct.cartitem.quantity + 1 x"
            );
            let current = uniqueProduct.cartitem.quantity + 1;

            return userCart
              .addProduct(uniqueProduct, {
                through: { quantity: current },
              })
              .then((cartAdded) => {
                res.redirect("/cart");
                console.log(cartAdded, " added cart");
              })
              .catch((error) => {
                console.log(error, "Error when try to already added cart");
              });
          }
          Products.findByPk(req.body.productId)
            .then((product) => {
              console.log(JSON.stringify(product), "Current Value");
              userCart
                .addProduct(product, {
                  through: { quantity: newQuantity },
                })
                .then((cartAdded) => {
                  console.log("cartAddedcartAdded", cartAdded);
                  res.redirect("/");
                })
                .catch((error) => {
                  console.log(error);
                });
            })
            .catch((error) => {
              console.log(
                "Error when find the  product to add to cart " + error
              );
            });
        });
    })
    .catch((err) => {
      console.log("Error in posting Cart", err);
    });

  // Products.fetchProductById(req.body.productId, (product) => {
  //   CartClass.addCart(req.body.productId, product.cost);
  //   res.redirect("/");
  // });
};
// Fetching all the product in the Cart
exports.cart = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      return cart
        .getProducts()
        .then((products) => {
          console.log(products, "Products Fetching in Cart");
          res.render("shop/cart", {
            Heading: "Cart",
            active: "cart",
            products: products,
          });
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => {
      console.log(err);
    });
};
// Delete the product in the cart
exports.deleteCartItem = (req, res) => {
  req.user
    .getCart()
    .then((cart) => {
      // console.log(cart.dataValues , typeof cart)
      // console.log(JSON.stringify(cart))
      let currentProduct;
      cart.getProducts({ where: { id: req.body.id } }).then((product) => {
        currentProduct = product[0];
        currentProduct.cartitem
          .destroy()
          .then((response) => {
            res.redirect("/");
          })
          .catch((err) => {
            console.log(err);
          });
      });
    })
    .catch((err) => {
      console.log("Error in Delete Cart" + err);
    });

  // Products.fetchProductById(req.body.id, (product) => {
  //   CartClass.deleteCart(req.body.id, product.cost);
  // });
  // res.redirect("/");
};
exports.checkout = (req, res) => {
  res.render("shop/checkout", {
    Heading: "Checkout",
    active: "checkout",
  });
};
exports.orders = (req, res) => {
  res.render("shop/orders", {
    Heading: "Orders",
    active: "orders",
  });
};
