exports.error = (req, res) => {
  res
    .status(400)
    .render("404", { Heading: "No Data Available", active: "false" });
};
