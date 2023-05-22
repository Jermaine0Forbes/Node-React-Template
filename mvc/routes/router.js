const express = require('express');
const route = express.Router();
const homeCtr = require("../controllers/homeController");
const userCtr = require("../controllers/userController");
// const  Users = require("../models/users");
const bcrypt = require("bcrypt");
const validator = require("validator");
import Users from "../models/users";

async function hashPassword(password, saltRounds = 10)
{
   return await bcrypt
                .genSalt(saltRounds)
                .then( salt => {
                    return bcrypt.hash(password, salt)
                })
                .catch( err => console.error(err));

}

function invalidRegister(email, user, pass){
    return !(validator.isEmail(email) && user && pass);
}

// route.get("/", home.index);
route.post("/store/user", homeCtr.storeUser);
route.get("/users", userCtr.index);
route.post("/register", async (req,res) => {
    
    const { email, username, password}  = req.body;
    if(invalidRegister(email, username, password))
       return res.sendStatus(400);

    const hashed = await hashPassword(password);
    console.log(hashed);
    // return res.sendStatus(200);
    console.log(Users)
    // Users.create({username, password: hashed, email})
    // .then(resp => {
    //     console.log(resp)
    //     res.sendStatus(200);
    // })
    // .catch(err => console.log(err));

    // User.create()
    
})


module.exports = route;
