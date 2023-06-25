const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const customer = require("./routes/shop");
const path = require("path");
const error = require("./controllers/404error");
const db = require("./utils/databse");
const app = express();
app.set("view engine", "ejs");
app.set("views", "views");
app.use(bodyParser());
app.use(express.static(path.join(__dirname, "/public")));

app.use("/admin", admin.routes);
app.use(customer);
app.use("/", error.error);

app.listen(8000);
