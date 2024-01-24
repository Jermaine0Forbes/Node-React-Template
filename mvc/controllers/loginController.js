const  { Users } = require("../models/index");
const { 
logging, invalidEmail, generateAccessToken,
invalidRegister, invalidPassword, noUser,
hashPassword, getValidationErrors, 
} = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports.register = async (req,res) => {
    logging('api', req.originalUrl)

    const invalid = validationResult(req);
    let msg;
    let errMsgs;

    if(!invalid.isEmpty())
    {
        console.error(invalid.array())
        errMsgs = getValidationErrors(invalid.array());
        return res.status(400).send(errMsgs);
    }

    // needs to check if email and maybe username already exists
    const { email, username, password, adminLevel = 4}  = req.body;
    if(invalidRegister(email, username, password))
    {
        msg = `registration fields need to be filled in or corrected`;
        errMsgs = getValidationErrors([{type: 'other', msg }]);
        return res.status(400).send(errMsgs);
    }   

    const hashed = await hashPassword(password);

    await Users.create({username, password: hashed, email, adminLevel})
    .then(resp => {
        const user = { email, username, adminLevel, id: resp.id};
        res.send(generateAccessToken(user));
    })
    .catch(err =>{
         res.status(400).send(err);
    });
}

module.exports.login = async (req, res) => {
    logging('api', req.originalUrl)
   const {email, password} = req.body;
   const invalid = validationResult(req);
   let errMsgs;
   let msg;

   if(!invalid.isEmpty())
   {
        console.error(invalid.array())
       errMsgs = getValidationErrors(invalid.array())
       return res.status(400).send(errMsgs);
   }

   if(invalidEmail(email))
   {
    msg = 'Invalid email';
    console.error(msg)
    errMsgs = getValidationErrors([{ type: 'email', msg: msg}])
    return res.status(400).send(errMsgs);
   }

   const pass = await Users.findOne({
    where: {email}, 
    attributes: ['password'],
    logging: (sql, queryObject) => {
        logging('sql', sql);
    }
    });


   if(await invalidPassword(password, pass))
   {
    msg = 'The users credentials are incorrect';
    console.error(msg);
    errMsgs = getValidationErrors([{ type: 'password', msg: msg}])
    return res.status(400).send(errMsgs);
   }

   const user = await Users.findOne({
    where: {email}, 
    attributes: ['adminLevel','email', 'id', 'username'],
    logging: (sql, queryObject) => {
        logging('sql', sql);
     }
    });

    if(noUser(user))
    {
        msg = `user does not exist, ${JSON.stringify(user)}, was returned `;
        console.error(msg)
     return res.status(400).send(msg);
    }

   return res.send(generateAccessToken(user.dataValues));
}