const Sequelize = require("sequelize");
const db = require("../utils/databse");
const orderitem = db.define("orderitem", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },
  quantity: {
    type: Sequelize.INTEGER,
  }
});
module.exports = orderitem;
