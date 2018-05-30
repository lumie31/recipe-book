const express = require("express");
const path = require("path");
const bodyParser = require("body-paresr");
const cons = require("consolidate");
const dust = require("dustjs-helpers");
const pg = require("pg");

//DB Connect string
const connect =
  "postgresql://olumide:lumidizzle31@database.server.com:3211/recipeapp";

//Assign Dust engine to .dust files
app.engine("dust", cons.dust);

//Set default ext .dust
app.set("view engine", "dust");
app.set("views", __dirname + "/views");

//Set public folder
app.use(express.static(path.join(__dirname, "public")));

//Body parser middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", function(req, res) {
  console.log("works");
  // res.render("index");
});

//Server
app.listen(3000, function() {
  console.log("Server stated on port 3000");
});
