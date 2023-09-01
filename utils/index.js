const fs = require('fs');
const path = require('path');
const bcrypt = require("bcrypt");
const validator = require("validator");

function logging(fileName, content) {

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

async function sleep (seconds = 5){
  // equivalent of sleeping
  await new Promise(resolve => setTimeout(resolve, seconds*1000));
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
}

exports.invalidEmail = function invalidEmail(email){
    if(validator.isEmail(email)){
        return false;
    }
    const msg = `400 Bad Request : email is not valid`;
    console.error(msg);
    logging('error', msg);
    return true;
}

exports.noUser = function noUser(user){
    if (typeof user === "object" && user?.id){
        return false;
    }
    const msg = `400 Bad Request : user does not exist, ${JSON.stringify(user)}, was returned `;
    console.error(msg);
    logging('error', msg);
    return true;
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
}

exports.logging = logging;
exports.sleep = sleep;