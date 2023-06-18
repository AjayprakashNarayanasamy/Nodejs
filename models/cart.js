const fs = require("fs");
const path = require("path");

const cartPath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "cart.json"
);

module.exports = class Cart {
  static addCart(id, cost) {
    let cartSetup = { product: [], cartTotal: 0 };
    fs.readFile(cartPath, (err, cartProduct) => {
      if (!err && cartProduct.length > 0) {
        cartSetup = JSON.parse(cartProduct);
      }

      const currentProductIndex = cartSetup.product.findIndex(
        (product) => product.id == id
      );

      let existingProduct = cartSetup.product[currentProductIndex];

      if (existingProduct) {
        cartSetup.product[currentProductIndex] = {
          ...existingProduct,
          qty: existingProduct.qty + 1,
        };
      } else {
        cartSetup.product.push({ id: id, qty: 1 });
      }
      cartSetup.cartTotal = cartSetup.cartTotal + Number(cost);
      fs.writeFile(cartPath, JSON.stringify(cartSetup), (err) => {});
    });
  }
  static deleteCart(id, cost) {
    fs.readFile(cartPath, (err, cartProduct) => {
      if (err) {
        return;
      }

      const cartProducts = { ...JSON.parse(cartProduct) };
      const productToBeDeleted = cartProducts.product.find(
        (product) => product.id === id
      );
      if(!productToBeDeleted){
        return ;
      }
      // Remove the Product from the cart
      cartProducts.product = cartProducts.product.filter(
        (filterCartById) => filterCartById.id !== id
      );
      // Remove the cost from the cart based on the product to be deleted
      cartProducts.cartTotal =
        cartProducts.cartTotal - cost * productToBeDeleted.qty;

      fs.writeFile(cartPath, JSON.stringify(cartProducts), (err) => {});
    });
  }
  static displayCart(cb) {
    fs.readFile(cartPath, (err, cartProduct) => {
      if (err) {
        return cb(null);
      }
      cb(JSON.parse(cartProduct));
    });
  }
};
