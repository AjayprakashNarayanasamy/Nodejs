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
      console.log(err);
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
    .catch((err) => console.log(err));
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
exports.postCart = (req, res) => {
  Products.fetchProductById(req.body.productId, (product) => {
    CartClass.addCart(req.body.productId, product.cost);
    res.redirect("/");
  });
};
exports.cart = (req, res) => {
  CartClass.displayCart((productInCartId) => {
    Products.fetchProduct((availableProducts) => {
      const cartProducts = [];
      for (let product of availableProducts) {
        let quantity = productInCartId.product.find(
          (val) => val.id === product.id
        );
        if (quantity) {
          cartProducts.push({ productData: product, qty: quantity.qty });
        }
      }

      res.render("shop/cart", {
        Heading: "Cart",
        active: "cart",
        products: cartProducts,
      });
    });
  });
};
exports.deleteCartItem = (req, res) => {
  Products.fetchProductById(req.body.id, (product) => {
    CartClass.deleteCart(req.body.id, product.cost);
  });
  res.redirect("/");
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
