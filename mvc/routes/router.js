const express = require('express');
const router = express.Router();
const homeCtr = require("../controllers/homeController");
const userCtr = require("../controllers/userController");
const  { Users } = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");
// import Users from "../models/users";

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
router.post("/store/user", homeCtr.storeUser);
router.get("/users", userCtr.index);
router.route('/user/:id')
      .get(userCtr.get)

router.post("/register", async (req,res) => {
    
    const { email, username, password, adminLevel}  = req.body;
    if(invalidRegister(email, username, password))
       return res.sendStatus(400);

    const hashed = await hashPassword(password);
    console.log(hashed);
    console.log(req.body);
    await Users.create({username, password: hashed, email, adminLevel})
    .then(resp => {
        console.log(resp)
        res.sendStatus(200);
    })
    .catch(err => console.log(err));
})


module.exports = router;
