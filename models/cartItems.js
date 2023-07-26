const Sequelize = require("sequelize");
const db = require("../utils/databse");

const cartItems = db.define("cartitem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  },
});
module.exports = cartItems
