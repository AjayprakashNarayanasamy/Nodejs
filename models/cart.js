const Sequelize = require("sequelize");
const db = require("../utils/databse");
const cart = db.define("cart", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
});
module.exports = cart;
