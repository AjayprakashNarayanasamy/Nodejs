const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const customer = require("./routes/shop");
const path = require("path");
const rootdir = require("./utils/path");

const app = express();
app.set("view engine","ejs")
app.set("views","views")

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/admin", admin.routes);
app.use(customer);
app.use("/", (req, res) => {
  res.status(400).render("404" , {Heading:"No Data Available" , active:"false"});
});

app.listen(8000);
