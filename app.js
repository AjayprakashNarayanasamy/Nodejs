const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const customer = require("./routes/shop");
const path = require("path");
const error = require("./controllers/404error");
const db = require("./utils/databse");
const app = express();
const product = require("./models/product");
const user = require("./models/user");
const cart = require("./models/cart");
const cartItems = require("./models/cartItems");
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use((req, res, nxt) => {
  user
    .findByPk(1)
    .then((val) => {
      req.user = val;

      nxt();
    })
    .catch((err) => {
      console.log("Error in Authentication of user", err);
    });
});
app.use("/admin", admin.routes);
app.use(customer);
app.use("/", error.error);
product.belongsTo(user, { constraints: true, onDelete: "CASCADE" });
user.hasMany(product);
user.hasOne(cart);
cart.belongsTo(user);
cart.belongsToMany(product, { through: cartItems });
product.belongsToMany(cart, { through: cartItems });
// db.sync()
//   .then((val) => {
//     return user.findByPk(1);
//   })
//   .then((User) => {
//     if (!User) {
//       user.create({
//         name: "Ajay Praksh N",
//         email: "ajayprakashn66@gmail.com",
//       });
//     }
//     return User;
//   })
//   .then((User) => {
//     //  return db.drop()
//     console.log("User Created Successfully");
//     User.createCart();
//   })
//   .catch((err) => {
//     console.log(err, "Error in sync");
//   });
app.listen(8000);
