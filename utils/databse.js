const { Sequelize } = require("sequelize");

// const connection = new Sequelize("postgres://ajayprakashn66:QWUBybK6oj9L@ep-fragrant-king-257539.ap-southeast-1.aws.neon.tech/Ecommerce")
const sequelize = new Sequelize("ServiceBooking", "ajayprakashn66", "2RBoXu9bagnM", {
  host: "ep-fragrant-king-257539.ap-southeast-1.aws.neon.tech",
  dialect: "postgres",
  dialectOptions: {
    ssl: true, // or "require"
  },
});
module.exports = sequelize;
