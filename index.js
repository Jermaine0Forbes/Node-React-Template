// require("./mvc/models/db");
require('dotenv').config();
require(__dirname+"/utils/global");
var express = require('express');
var body = require('body-parser');
var cookie = require('cookie-parser');
var path = require('path');
var app = express();
var ip =  process.env.IP || 'localhost'; // change the IP address to get your 
var cors = require("cors");
var port = process.env.PORT || 3001;
const routes = require('./mvc/routes/router');


var whitelist = ['http://localhost:3200', 'http://localhost:4000']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (whitelist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

app.use(cors(corsOptionsDelegate));
app.set("views",path.join(__dirname,"mvc/views")); // setting the views path
app.use(express.static(path.join(__dirname,'public/js/')));
app.use(body.json());
app.use(body.urlencoded({extended:true}));
app.use(cookie());

app.use("/api", routes);
app.get('*', (req, res) => res.sendFile(path.resolve('public', 'js','index.html')));

app.use(function(err,req,res,next){
	if(res.statusCode == 404 ){
	  return res.sendStatus(404);
	}else{
        return next();
    }
});

app.use(function(err,req,res,next){
    let path , code ;
     switch(res.statusCode){
         case 500:
            path = "error/500";
            code = 500;
         break;
         case 502:
            path = "error/502";
            code = 502;
        break;
         case 503:
            path = "error/503";
            code = 502;
        default:
            path = "error/400";
            code = res.statusCode;
     }
})

app.listen(port, ip, function(){
    const env = process.env.APP_ENV;
    console.log("node connected to "+port);
    console.log("node environment is in "+env)
})
