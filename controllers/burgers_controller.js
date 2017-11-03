console.log('inside burgers_controller.js');

var express = require("express");

var router = express.Router();

// Import the model (burger.js) to use its database functions.
var burgers = require("../models/burger.js");

// Create all our routes and set up logic within those routes where required.
//Root get route
//Tell the client to go to another page
router.get("/", function(req, res) {
	res.redirect("burgers")
});

router.get("/burgers", function(req, res) {
  burgers.selectAll(function(data) {
    // Handlebars object
    var hbsObject = {
      burgers: data
    };
    console.log(hbsObject);
    res.render("index", hbsObject);
  });
});
//Post Route
router.post("/burgers/create", function(req, res) {
  burgers.insertOne([
    "burger_name"
  ], [
    req.body.burger_name
  ], function(data) {
   
    res.redirect("/burgers");
  });
});
//Put Route
router.put("/burgers/update/:id", function(req, res) {
  var condition = "id = " + req.params.id;

  console.log("condition", condition);

  burgers.updateOne({
    "devoured": req.body.devoured
  }, condition, function(data) {
    res.redirect("/burgers")
    
  });
});


module.exports = router;