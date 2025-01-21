const  { Topics } = require("../models/index");
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

module.exports.create = async (req,res) => {
    logging('api', req.originalUrl)
    const { title }  = req.body;

}


module.exports.index = async (req,res) => {
    logging('api', req.originalUrl)

    const data = await Topics.findAll({ 
        attributes : ['id','username', 'adminLevel'],
        logging: (sql) => {
          logging('sql', sql);
        }
    });

    res.json({topics: data})

}
