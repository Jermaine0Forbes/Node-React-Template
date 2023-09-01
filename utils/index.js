const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const validator = require("validator");

function logging(fileName, content) {

  const logFilePath = path.resolve(__dirname+'/../logs/', fileName+".log")
  const logEntry = `${new Date().toISOString()}: ${content}\n`
  // console.log(filePath);

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      console.error('Error writing to the log file:', err);
    } else {
      console.log('Log entry added to', logFilePath);
    }
  });

}

exports.invalidNumber = function invalidNumber(num){
    if( typeof Number(num)  !== "number")
    {
      const msg = `400 Bad Request : ${id} is not a number`;
      console.error(msg);
      logging('error', msg);
      return true;
    }
    return false;
  }


exports.invalidRegister =  function invalidRegister(email, user, pass){
    if (validator.isEmail(email) && user && pass){
        return false;
    }
    const msg = `400 Bad Request : registration fields need to be filled in or corrected`;
    console.error(msg);
    logging('error', msg);
    return true;

    // return !(validator.isEmail(email) && user && pass);
}

exports.invalidEmail = function invalidEmail(email){
    if(validator.isEmail(email)){
        return false;
    }
    const msg = `400 Bad Request : email is not valid`;
    console.error(msg);
    logging('error', msg);
    return true;
    // return !validator.isEmail(email);
}

exports.noUser = function noUser(user){
    if (typeof user !== "object" && user?.id){
        return false;
    }
    const msg = `400 Bad Request : user does not exist based on given credentials`;
    console.error(msg);
    logging('error', msg);
    return true;
    // return typeof user !== "object";
}

exports.invalidPassword = async function invalidPassword(pass, user){
  const result = await bcrypt.compare(pass, user.password);
  if(result){
    return false;
  }
  const msg = `400 Bad Request : password was incorrect`;
  console.error(msg);
  logging('error', msg);
  return true;
//   return !result;
}

exports.logging = logging;