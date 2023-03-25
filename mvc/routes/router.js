var express = require('express');
var route = express.Router();
const home = require("../controllers/homeController");
const user = require("../controllers/userController");

route.get("/", home.index);
route.post("/store/user", home.storeUser);
route.get("/users", user.index);


module.exports = route;
