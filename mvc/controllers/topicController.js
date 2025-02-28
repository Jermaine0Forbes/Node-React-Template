const  { Topics, Entries } = require("../models/index");
const { logging, getUser } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');

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

    const subtopics = await Topics.findAll(
        {
             where: {parentTopicId: id, subtopic: 1},
             logging: (sql) => {
                logging('sql', sql);
             }
        }
    );

    res.json({ topic:data, subtopics})

}

module.exports.getSubs = async (req,res) => {
    logging('api', req.originalUrl)
    const { id }  = req.params;

    const entries = await Entries.findAll({
        where: {topicId: id},
        logging: (sql) => {
            logging('sql', sql);
          }
    })

    const subtopics = await Topics.findAll(
        {
             where: {parentTopicId: id, subtopic: 1},
             logging: (sql) => {
                logging('sql', sql);
             }
        }
    );

    res.json({ entries, subtopics});
}

module.exports.put = async (req, res) => {
    logging('api', req.originalUrl);

    console.log(req.body)
    const {title,  userId, id} = req.body;
    const data = await Topics.update(
        {title, userId},
        { 
            where: { id },
            logging: (sql) => {
                logging('sql', sql);
              }
        });

    console.log('data')
    console.log(data)
    res.json(data)

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
    console.log("getting user json")
    const user = getUser();
    console.log(user)

    res.json(data)

}
