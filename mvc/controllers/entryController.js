const  { Entries } = require("../models/index");
const { logging } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

module.exports.create = async (req,res) => {
    logging('api', req.originalUrl)
     console.log(req.body)

     if(!Array.isArray(req.body)) {
        const msg = 'request body is not an array';
        logging('error', msg);
       return res.status(400).send(msg);
     }

    const bulkUpdate = req.body.filter( e => e.hasOwnProperty('id'));
    const bulkCreate = req.body.filter( e => !e.hasOwnProperty('id'));
     console.log('creating')
    console.log(bulkCreate)
    console.log('updating')
    console.log(bulkUpdate)

    const data = await Entries.bulkCreate(bulkCreate,{
        logging: (sql) => {
            logging('sql', sql);
          }
     })

    const updateList = [];
    for(let i = 0; i < bulkUpdate.length;  i++)

      updateList[i] = await Entries.update({
        title: bulkUpdate[i]?.title,
        entry: bulkUpdate[i]?.entry
      }, {
            where:{id: bulkUpdate[i]?.id},
            logging: (sql) => {
                logging('sql', sql);
              }
        })
 
    res.json({ create: data, update: updateList});

}


module.exports.index = async (req, res) => {
    logging('api', req.originalUrl)

    console.log(req.params)
    const {id} = req.params;
    const data = await Entries.findAll({
        where: {topicId: id},
        logging: (sql) => {
            logging('sql', sql);
          }
    })
    console.log(data)
    res.json(data);
} 

