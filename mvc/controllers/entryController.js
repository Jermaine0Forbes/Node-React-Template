const  { Entries, Tags, TagsToEntries } = require("../models/index");
const { logging, getUser } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');

dotenv.config();

const prepareTags = async (tag) => {
  console.log("getting user json")
  const {id} = await getUser();
   if (typeof tag === "string") return { name: tag, userId:id}; 

} 

const prepareEntries = async (data) => {
   return data.map((obj) => {
      
      const { title, entry, 'tags[]': tags, topicId } = obj;
      const preppedTags = tags.map(prepareTags);
      return {
        title,
        entry,
        tags: preppedTags,
        topicId,
      }
   })
}

const includeTagList = (entries, tags = []) => {
  const _tags = tags.map(tag => {
    console.log(tag)
    const {name} = tag.dataValues;
    delete tag.dataValues['tags-to-entries'];
    return tag;
  })
 return entries.map( (entry) => {
   
    entry.dataValues['tagList'] = _tags;
    return entry;
  });

}


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

    const normalized = await prepareEntries(bulkCreate);

    console.log('normalized')
    console.log(normalized)
     let data;
     let entry;
     let tag, x;

     entry = await Entries.bulkCreate(normalized, {
          include: [
            {
              model:Tags,
              as: 'tags',
              attributes: ['name', 'userId']
            },
          ],
          logging: (sql) => {
              logging('sql', sql);
            }

     });

     console.log(entry);


    // for(let i = 0; i < normalized.length;  i++) {
    //     data = normalized[i];
    //    entry = await Entries.create(data,{
    //       include: Tags,
    //       logging: (sql) => {
    //           logging('sql', sql);
    //         }
    //    });
    //    tag = await Tags.create(data.tags[0], {
    //     logging: (sql) => {
    //       logging('sql', sql);
    //     }
    //    });

    //    x = await entry.addTags(tag, {through: {userId: 1 }});
    //    console.log(x)
    // };



    // const updateList = [];
    // for(let i = 0; i < bulkUpdate.length;  i++)

    //   updateList[i] = await Entries.update({
    //     title: bulkUpdate[i]?.title,
    //     entry: bulkUpdate[i]?.entry
    //   }, {
    //         where:{id: bulkUpdate[i]?.id},
    //         logging: (sql) => {
    //             logging('sql', sql);
    //           }
    //     })
 
    // res.json({ create: data, update: updateList});

}


module.exports.index = async (req, res) => {
    logging('api', req.originalUrl)

    console.log(req.params)
    const {id} = req.params;
    let entries;
    entries = await Entries.findAll({
        attributes: ['id', 'title', 'entry', 'topicId'],
        where: {topicId: id},
        include: [
          {
            model:Tags,
            as: 'tags',
            attributes: ['name', 'id']
          },
        ],
        exclude:[
         { model: 'tags-to-entries',}
        ],
        logging: (sql) => {
            logging('sql', sql);
          }
    });

    const tags = await Tags.findAll({
      // attributes: ['name', 'id'] ,
      attributes: { exclude:['termId', 'createdAt', 'updatedAt', 'tags-to-entries']} ,
      // include: [
      //   {
      //     model: 'tags-to-entries',
      //     through: { attributes: []}
      //   }

      // ],
      logging: (sql) => {
        logging('sql', sql);
      },
    });
    
    if(Array.isArray(entries) && entries.length > 0 ) {
      entries = includeTagList(entries, tags)
    }
    // console.log(entries)
    res.json(entries);
} 

