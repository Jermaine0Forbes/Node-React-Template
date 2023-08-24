const express = require('express');
const router = express.Router();
const homeCtr = require("../controllers/homeController");
const userCtr = require("../controllers/userController");
const loginCtr = require("../controllers/loginController");
const  { Users } = require("../models/index");

// import Users from "../models/users";



// route.get("/", home.index);
router.post("/store/user", homeCtr.storeUser);
router.get("/users", userCtr.index);
router.route('/user/:id')
      .get(userCtr.get)
      .put(userCtr.put)
      .delete(userCtr.delete)

router.post("/register",loginCtr.register);
router.post("/login",loginCtr.login);


module.exports = router;
