const Cart = require("./cart");
const db = require("../utils/databse");
module.exports = class Product {
  constructor(id, title , cost , image , description) {
    console.log(title, "constructor");
    this.id = id;
    this.title = title;
    this.cost = cost;
    this.image = image;
    this.description = description;
  }
  save() {
    return db.execute(
      "INSERT INTO sql12627291.products (title , cost , image , description) VALUES (?,?,?,?)",
      [this.title, this.cost, this.image, this.description]
    );
  }
  static delete(id) {}

  static fetchProduct() {
    return db.execute("SELECT * FROM sql12627291.products;");
  }
  static fetchProductById(id) {

  return db.execute("SELECT * FROM sql12627291.products WHERE id = ? " , [id])

  }
};
