const  { Entries, Tags, TagsToEntries,Topics } = require("../models/index");
const { logging, loggingV2} = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');


module.exports.index = async(req, res) => {
    logging('api', req.originalUrl);

    console.log('req query is')
    console.log(req.query)
    const totalCount = 10;
    const { page } = req.query;
    const currentPage = parseInt(page);
    const offset = Number.isInteger(currentPage) ? currentPage  * totalCount : 0;
    // const offset = Number.isInteger(page) ? page * 3 : 0;

    const tags = await Tags.findAll({
      offset: offset,
      limit: totalCount,
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
        // plain: true,
        // raw: true,
        logging: (sql) => {
            logging('sql', sql);
          }
    });

    const json = {rows:tags, nextOffset: currentPage +1 };
    console.log(json)
    res.json(json);
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