const  { Users } = require("../models/index");
const bcrypt = require("bcrypt");
const validator = require("validator");

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


module.exports.register = async (req,res) => {
    
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
}