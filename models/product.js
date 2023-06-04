const fs = require("fs");
const path = require("path");
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
  constructor(title) {
    this.title = title;
  }
  save() {
    getProductFromFile((product) => {
      console.log(product, "product");
      product.push(this.title);
      fs.writeFile(filePath, JSON.stringify(product), (err) => {});
    });

    // products.push(this.title);
  }
  static fetchProduct(cb) {
    getProductFromFile(cb);
  }
};
