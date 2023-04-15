const express = require("express");
const bodyParser = require("body-parser");
const admin = require("./routes/admin");
const customer = require("./routes/shop");
const path = require("path");
const rootdir = require("./utils/path");

const app = express();

app.use(bodyParser());
app.use(express.static(path.join(__dirname, "/public")));
app.use("/admin", admin);
app.use(customer);
app.use("/", (req, res) => {
  res.status(400).sendFile(path.join(rootdir, "views", "404.html"));
});

app.listen(800);
