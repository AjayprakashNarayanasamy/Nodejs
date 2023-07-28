const Sequelize = require("sequelize");
const db = require("../utils/databse");
const order = db.define("order", {
  id: {
    type: Sequelize.INTEGER,
    allowNull: false,
    autoIncrement: true,
    primaryKey: true,
  },

});
module.exports = order;
