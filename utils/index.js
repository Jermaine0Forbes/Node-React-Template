const fs = require('fs');
const path = require('path');

exports.logging = function logging(fileName, content) {

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