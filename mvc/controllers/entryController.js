const  { Users } = require("../models/index");
const { logging } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports.create = async (req,res) => {
    logging('api', req.originalUrl)
     console.log(req.body)

}

