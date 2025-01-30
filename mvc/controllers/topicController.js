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
    const data = await Topics.create( req.body,
    { 
        logging: (sql) => {
            logging('sql', sql);
          }
    });

    res.json({topic: data})

}

module.exports.view = async (req,res) => {
    logging('api', req.originalUrl)
    const { id }  = req.params;
    const data = await Topics.findOne(
    { 
        where: { id },
        logging: (sql) => {
            logging('sql', sql);
          }
    });

    res.json({ topic:data})

}



module.exports.index = async (req,res) => {
    logging('api', req.originalUrl)

    const { id } = req.params;

    const data = await  Topics.findAll({
        where: { userId: id}, 
        attributes : ['id','title'],
        logging: (sql) => {
          logging('sql', sql);
        }
    });
    // console.log(data)

    res.json(data)

}
