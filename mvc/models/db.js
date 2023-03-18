require('dotenv').config();
const goose = require('mongoose');
const db = goose.connection;
const dbURI = 'mongodb://'+process.env.MONGO_HOST+'/'+process.env.MONGO_DB;
const settings = { useNewUrlParser: true,  useUnifiedTopology: true  };
goose.connect(dbURI, settings);

db.on('connected', function(){
    console.log("database connected");
});

db.on('error', function(err){
    console.log(err)
});

db.on('disconnected', function(){
    console.log("database disconnected");
});

// Make sure you put the schema file 
// at the bottom of the db file. I'm not sure why
// I assume after a connection has been made it will
// create the model and attach it to mongoose
require('./schema')
