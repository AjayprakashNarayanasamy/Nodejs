const fs = require("fs");
const path = require("path");
const Cart = require("./cart");
const filePath = path.join(
  path.dirname(process.mainModule.filename),
  "data",
  "product.json"
);
const getProductFromFile = (cb) => {
  fs.readFile(filePath, (err, readContent) => {
    if (!err && readContent.length > 0) {
      return cb(JSON.parse(readContent.toString()));
    } else {
      return cb([]);
    }
  });
};
module.exports = class Product {
  constructor(product) {
    this.product = product;
  }
  save() {
    getProductFromFile((products) => {
      if (this.product.id.length === 0) {
    
        this.product = { ...this.product, id: Math.random().toString() };
        products.push(this.product);
        fs.writeFile(filePath, JSON.stringify(products), (err) => {});
      } else {
       
        

        let existingProductId = products.findIndex(
          (existingProduct) => existingProduct.id === this.product.id
        );
     

        products[existingProductId] = this.product;

        fs.writeFile(filePath, JSON.stringify(products), (err) => {});
      }
    });

    // products.push(this.title);
  }
  static delete(id) {
    getProductFromFile((product) => {
  
      const productCost = product.find((val) => {
        return val.id === id;
      });
      const value = product.filter((val) => {
  

        return val.id !== id;
      });
    
      fs.writeFile(filePath, JSON.stringify(value), (err) => {
        if (!err) {
          Cart.deleteCart(id, productCost.cost);
        }
      });
    });
  }

  static fetchProduct(cb) {
    getProductFromFile(cb);
  }
  static fetchProductById(id, cb) {
    getProductFromFile((product) => {
      cb(product.find((val) => val.id === id));
    });
  }
};
