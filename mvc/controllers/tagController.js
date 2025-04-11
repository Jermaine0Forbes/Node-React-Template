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

module.exports.view = async(req,res) => {
  logging('api', req.originalUrl);

  const { id }  = req.params;

  const tag = await Tags.findOne({
    where:{id},
    attributes:['name'],
    logging: (sql) => {
      logging('sql', sql);
    }
  });

  res.json(tag);
}


module.exports.put = async(req,res) => {
  logging('api', req.originalUrl);

  const { id, name }  = req.body;

  const tag = await Tags.update({name},{
    where:{id},
    logging: (sql) => {
      logging('sql', sql);
    }
  });

  res.json(tag);
}