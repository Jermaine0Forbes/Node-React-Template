const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const validator = require("validator");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

function getValidationErrors (validErrs) 
{
  errMsgs = {}
  validErrs.forEach(e => {
     let type = e?.path || e.type;
      switch(type)
      {
          case 'email':
              errMsgs.email = e.msg;
              break;
          case 'username':
              errMsgs.username = e.msg;
              break;
          case 'password':
              errMsgs.password = e.msg;
              break;
          default:
            errMsgs.other = e.msg
      }
  })
  return errMsgs;
} 

function invalidEmail(email){
  if(validator.isEmail(email)){
      return false;
  }
  const msg = `email is not valid`;
  console.error(msg);
  logging('error', msg);
  return true;
}


function invalidNumber(num){
  const id = Number(num);
    if(isNaN(id))
    {
      const msg = `400 Bad Request : ${id} is not a number`;
      console.error(msg);
      logging('error', msg);
      return true;
    }
    return false;
}

async function invalidPassword(pass, user){
  const result = user?.password ? await bcrypt.compare(pass, user.password) : false;
  if(result){
    return false;
  }
  const msg = `400 Bad Request : password was incorrect`;
  console.error(msg);
  logging('error', msg);
  return true;
}

function invalidRegister(email, user, pass){
  if (validator.isEmail(email) && user && pass){
      return false;
  }
  const msg = `registration fields need to be filled in or corrected`;
  console.error(msg);
  logging('error', msg);
  return true;
}

 function logging (fileName, content) {

  const logFilePath = path.resolve(__dirname+'/../logs/', fileName+".log")
  const logEntry = `${new Date().toISOString()}: ${content}\n`

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to the log file:', err);
    } else {
      console.log('Log entry added to', logFilePath);
    }
  });
 }

 function noUser(user){
  if (typeof user === "object" && user?.id){
      return false;
  }
  const msg = `user does not exist, ${JSON.stringify(user)}, was returned `;
  console.error(msg);
  logging('error', msg);
  return true;
}

 async function sleep (seconds = 5) {
  // equivalent of sleeping
  await new Promise(resolve => setTimeout(resolve, seconds*1000));
}


exports.generateAccessToken =  function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '3h' });
}

exports.hashPassword = async function (password, saltRounds = 10)
{
 return await bcrypt
              .genSalt(saltRounds)
              .then( salt => {
                  return bcrypt.hash(password, salt)
              })
              .catch( err => console.error(err));

}

exports.logging = logging;
  
exports.sleep = sleep;

exports.invalidNumber = invalidNumber;

exports.invalidRegister =  invalidRegister;

exports.invalidEmail = invalidEmail;

exports.noUser = noUser;

exports.invalidPassword = invalidPassword;

exports.getValidationErrors = getValidationErrors;
