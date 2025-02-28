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
  const date = new Date();
  // Get month name (long format)
  const month = date.toLocaleString('default', { month: 'long' });
  // Get year
  const year = date.getFullYear();
  // const dateStr = date.toDateString().split(' ').join('_');
  const logFilePath = path.resolve(__dirname+'/../logs/',`${fileName}_${month}_${year}.log`);
  const logEntry = `${date.toISOString()}: ${content}\n`

  fs.appendFile(logFilePath, logEntry, (err) => {
    if (err) {
      // console.error('Error writing to the log file:', err);
      fs.writeFile(logFilePath, logEntry, (err) => {
        if (err) throw err;
        console.log('File created and data appended.');
      });
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

function writeJson (data, name) {
  const json = typeof data === "object" ? JSON.stringify(data) : data;
  const directoryPath = __dirname+'/../json/';
  let msg;
  if(!fs.existsSync(directoryPath)){
     msg = directoryPath+": doesn't exist";
    logging('error', msg);
    fs.mkdirSync(directoryPath);
  }
  const fileName = `${name}.json`;
  const filePath = path.resolve(directoryPath,fileName);

  try{
    fs.writeFileSync(filePath, json);
  }catch(err){
    logging('error', err);
  }

}

function readJson(name) {
  const directoryPath = __dirname+'/../json/';
  if(!fs.existsSync(directoryPath)){
    fs.mkdirSync(directoryPath);
  }
  const fileName = `${name}.json`;
  const filePath = path.resolve(directoryPath,fileName);
  try {
   const  data = fs.readSync(filePath, 'utf8');
   return data;
  } catch(err) {
    logging('error', err);
  }
}


function getUser() {
  //  const  token  = readJson('user');
   const { token } = JSON.parse(readJson('user'));
   console.log(token)
   try{
    const user = jwt.verify(token, process.env.TOKEN_SECRET);
    console.log('verified token')
    console.log(user);
    return user;
   } catch(err) {
    logging('error', err);
   }


}


exports.generateAccessToken =  function (user) {
  return jwt.sign(user, process.env.TOKEN_SECRET, { expiresIn: '24h' });
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

exports.getUser = getUser;

exports.readJson = readJson;

exports.writeJson = writeJson;

exports.logging = logging;
  
exports.sleep = sleep;

exports.invalidNumber = invalidNumber;

exports.invalidRegister =  invalidRegister;

exports.invalidEmail = invalidEmail;

exports.noUser = noUser;

exports.invalidPassword = invalidPassword;

exports.getValidationErrors = getValidationErrors;
