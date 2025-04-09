const  { Entries, Tags, TagsToEntries,Topics } = require("../models/index");
const { logging, loggingV2, getUser } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


module.exports.index = async(req, res) => {
    logging('api', req.originalUrl)

    const tags = await Tags.findAll({
        attributes:['name', 'id'],
        include:[
            {
                model: Entries,
                as: 'entries',
                attributes: ['title'],
                include:[
                  {
                    model: Topics,
                    as: 'topic',
                    attributes: ['title', 'id'],
                    foreignKey: 'topicId'
                  }
    
                ],
                through: {
                  attributes: [],
                },
            }
        ],
        logging: (sql) => {
            logging('sql', sql);
          }
    });
    res.json(tags);
}