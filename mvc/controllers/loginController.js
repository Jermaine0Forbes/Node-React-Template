const  { Users } = require("../models/index");
const { logging, invalidEmail, 
    invalidRegister, invalidPassword, noUser,
    invalidNumber, } = require('../../utils/index');
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function generateAccessToken(user) {
    return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '3h' });
  }

async function hashPassword(password, saltRounds = 10)
{
   return await bcrypt
                .genSalt(saltRounds)
                .then( salt => {
                    return bcrypt.hash(password, salt)
                })
                .catch( err => console.error(err));

}



module.exports.register = async (req,res) => {
    logging('api', req.originalUrl)
    // needs to check if email and maybe username already exists
    const { email, username, password, adminLevel = 4}  = req.body;
    if(invalidRegister(email, username, password))
       return res.sendStatus(400);

    const hashed = await hashPassword(password);
    // console.log(hashed);
    // console.log(req.body);
   
    await Users.create({username, password: hashed, email, adminLevel})
    .then(resp => {
        console.log(resp)
        const user = { email, username, adminLevel, id: resp.id};
        res.send(generateAccessToken(user));
    })
    .catch(err => console.log(err));
}

module.exports.login = async (req, res) => {
    logging('api', req.originalUrl)
   const {email, password} = req.body;

   console.log(req.body);

//    console.log(require('crypto').randomBytes(64).toString('hex')) 

   if(invalidEmail(email))
   {
    return res.status(401).send('Invalid email');
   }
   const pass = await Users.findOne({
    where: {email}, 
    attributes: ['password'],
    logging: (sql, queryObject) => {
        logging('sql', sql);
    }
    });

   if(noUser(pass))
   {
    return res.status(401).send('There is no user with that email address');
   }

   if(await invalidPassword(password, pass))
   {
    console.error('The users credentials are incorrect');
    return res.status(401).send('The users credentials are incorrect');
   }
   const user = await Users.findOne({
    where: {email}, 
    attributes: ['adminLevel','email', 'id', 'username'],
    logging: (sql, queryObject) => {
        logging('sql', sql);
     }
    });

   console.log(user.dataValues)

   return res.send(generateAccessToken(user.dataValues));
}