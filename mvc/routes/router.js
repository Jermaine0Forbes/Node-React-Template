const express = require('express');
const { query, body } = require('express-validator');
const router = express.Router();
const userCtr = require("../controllers/userController");
const loginCtr = require("../controllers/loginController");


router.get("/users", userCtr.index);

router.route('/user/:id')
      .get(userCtr.get)
      .put(userCtr.put)
      .delete(userCtr.delete)

router.post("/register",
      [
       body('email').isEmail().trim().escape(), 
       body('username').trim().escape()
      ] ,
       loginCtr.register);
router.post("/login",loginCtr.login);


module.exports = router;
