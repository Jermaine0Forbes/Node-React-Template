const  { Entries, Tags, TagsToEntries } = require("../models/index");
const { logging, getUser, writeJson } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
dotenv.config();

async function getEntries (id) {

  let entries;
  entries = await Entries.findAll({
      attributes: ['id', 'title', 'entry', 'topicId'],
      where: {topicId: id},
      include: [
        {
          model:Tags,
          as: 'tags',
          attributes: ['name', 'id'], 
          through:{
            attributes: [],
          },
        },
      ],
      logging: (sql) => {
          logging('sql', sql);
         
        }
  });

  const tags = await Tags.findAll({
    attributes: { exclude:['termId', 'createdAt', 'updatedAt', 'tags-to-entries']} ,
    logging: (sql,queryObject) => {
      logging('sql', sql);
     
    },
  });
  

  // console.log(tags)
  return {entries,tags}; 

}

async function processEntries(entries, status){

  /*

    Every entry has a bunch of tags associated with it

    In this list of tags there might be some that have been
    added, created, or removed

    After the entry has been updated, we need to get the list of tags

    Do a query that gets the list of already existing tags that are
    associated with it

    Compare the new tags to the existing tags to see if there are any differences

    If there are any additional tags, check if they exist in the database. If some
    don't then create tags and association. If they do exist then create the associations
    with the entry id

    If there are missing, then we need to remove the association of the tag based off of
    the entry id

  */

  let entry;
  let entryId;
  let entryTags;
  let updateStatus;
  let entryCurrent;
  let ec;
  let logName = 'processEntries';
  const onlyStatuses = ['create', 'update'];
  const ln = logName;

  if(!onlyStatuses.includes(status)){
    logging(ln, 'status provided does not exist')
    return false;
  }

  Entries.hasMany(TagsToEntries, {
    foreignKey: 'entryId',
    attributes: [ 'userId', 'entryId', 'tagId']
  });
  TagsToEntries.belongsTo(Entries);
  Tags.hasMany(TagsToEntries);
  TagsToEntries.belongsTo(Tags);

for(entry of entries) {

  if (status === "update") {
     
      entryId = entry.id;
  
      updateStatus = await Entries.update({
        title: entry.title,
        entry: entry.entry
      }, {
            where:{id: entryId},
            include: [
              {
                model:Tags,
                as: 'tags',
                attributes: ['name', 'userId']
              },
            ],
            logging: (sql, queryObject) => {
                logging('sql', sql);
              
              }
        })
  
      /*
        Get the current entry
      */
      entryCurrent = await Entries.findByPk(entryId);
      ec = entryCurrent;
      logging(ln, 'the current entry is')
      logging(ln, ec)
      
      
  
      let us = updateStatus == 1 ? 'updated successfully' : 'update went wrong';
      logging(ln, `entry ${entryId}: ${us}`)
      
      

  } else if ( status === "create") {

     entryCurrent = await Entries.create(entry,{
        logging: (sql) => {
          logging('sql', sql);
        
        }
     });

    /*
      Get the current entry
    */
     ec = entryCurrent;
     logging(ln, 'the current entry is')
     logging(ln, ec)
     
     
     entryId = ec.id;
  }


  entryTags = entry?.tags;

  if(entryTags) {
    logging(ln, 'entryTags, count:'+ entryTags.length)
    

      for(let tag of entryTags) {

        let existingTags;
        let et;
        let count;

        logging(ln, 'entryId')
        logging(ln, entryId)
        
        

        let existingTagsFromEntries = await TagsToEntries.findAll({
          where:{
            entryId: entryId
          },
          include: [
            {
              model:Tags,
              as: 'tag',
              attributes: ['name', 'id']
            },
          ],
          logging: (sql) => {
            logging('sql', sql);
          
          }
        });

        let etfe = existingTagsFromEntries;
        existingTags = etfe.map( ent => ent.tag);
        et = existingTags;

        /*
          The tags that are associated with the entry
        */
        logging(ln, 'existingTags count:'+ et.length)
        logging(ln, existingTags)
        
        

        /*
          The tag names that are associated with the entry
        */
        exNames = et.map(e =>  e.name);
        logging(ln, 'existing names count:'+ exNames.length);
        logging(ln, exNames);
        
        


        /*
          The tags that currently are not associated with the entry
          in the database
        */
        let diffTags = entryTags.filter( ent => !exNames.includes(ent.name));
        let dt = diffTags;
        logging(ln, 'different tags')
        logging(ln, dt)
        
        


        /*
        The tags that already exist, but need to be added to the entry
        */

        let addedTags = dt.filter(ent => ent.hasOwnProperty('id'));
        let at = addedTags;
        logging(ln, 'added tags, count:'+ at.length);
        logging(ln, at);
        
        


        /*  
          The list of every tag name that has been created
        */
        let allTags = await Tags.findAll({ attributes:['name']});
        let allTagNames = allTags.map(tag => tag.name);
        let atn = allTagNames;
        logging(ln, 'all of the tag names')
        logging(ln, atn)
        
        

        /*  
          The tags that have not been created yet
        */
        let newTags = dt.filter(ent => !ent.hasOwnProperty('id') && !atn.includes(ent.name));
        let nt = newTags;
        logging(ln, 'new tags, count:'+nt.length);
        logging(ln, nt);
        
        

        /*
            The tag names that are associated with the entry
            from the post request
        */
        let newNames = entryTags.map(e => e.name);
        let nn = newNames;
        logging(ln, 'list of names of the new tags');
        logging(ln, nn)
        
        

        /*
          The tags that need to be removed from the entry
        */

        let removedTags = et.filter( ent => !nn.includes(ent.name));
        let rt = removedTags;
        logging(ln, 'removed tags count:'+ rt.length)
        logging(ln, rt)
        
        

        /*
        If there are any existing tags, add them to entry
        */
        if(addedTags.length > 0 ){

          count = await ec.countTagsToEntries();
          logging(ln, 'total of tags to entries')
          logging(ln, count)
          
          

          let tranformAddedTags = at.map( tag => ( { userId: tag.userId, entryId, tagId: tag.id }));
          let tat = tranformAddedTags;
          logging(ln, 'added tags that have been transformed');
          logging(ln,tat)
          
          

          // console.log('attempting to add tags to entries')
          logging(ln, 'attempting to add tags to entries')
          let tte = await TagsToEntries.bulkCreate(tat,{
            logging: (sql) => {
              logging('sql', sql);
            
            }
          });

          count = await ec.countTagsToEntries();
          // console.log('number of tags to entries left')
          // console.log(count)
          logging(ln, 'number of tags to entries left')
          logging(ln, count)

        }

        /*
          If are any new tags, create them first, then add them to the entry
        */
        if(newTags.length > 0) {
          count = await ec.countTagsToEntries();
          // console.log('total of tags to entries')
          // console.log(count)
          logging(ln, 'total of tags to entries')
          logging(ln, count)

            for(tag of newTags) {

            let  ct = await Tags.create({name: tag.name}, {
                logging: (sql) => {
                  logging('sql', sql);
                
                }
              });

              let transfromNewTag = { userId: tag.userId, entryId, tagId: ct.id};
              let tnt = transfromNewTag;

              // console.log('new tag that have been transformed');
              // console.log(tnt)
              logging(ln, 'new tag that have been transformed')
              logging(ln, tnt)

              // console.log('attempting to create a tags to entries row')
              logging(ln, 'attempting to create a tags to entries row')
              await ec.createTagsToEntry(tnt)
            }

            count = await ec.countTagsToEntries();
            // console.log('number of tags to entries left')
            // console.log(count)
            logging(ln, 'number of tags to entries left')
            logging(ln, count)
    

        
        }

        /*
          If certain tags that were present with an entry doesn't exist anymore
          then remove them
        */
        if(removedTags.length > 0 ) {

          count = await ec.countTagsToEntries();
          // console.log('total of tags to entries')
          // console.log(count)
          logging(ln, 'total of tags to entries')
          logging(ln, count)

          let transformRemovedTags = rt.map( tag => ( { entryId, tagId: tag.id }));
          let trt = transformRemovedTags;
          // console.log('removed tags that have been transformed')
          // console.log(trt);
          logging(ln, 'removed tags that have been transformed')
          logging(ln, trt)

          for(tag of trt) {

            console.log('attempting to remove tags to entries')
            let tte = await TagsToEntries.destroy({
              where: tag,
              logging: (sql) => {
                logging('sql', sql);
              
              }
            });

          }
          
          count = await ec.countTagsToEntries();
          // console.log('number of tags to entries left')
          // console.log(count)
          logging(ln, 'number of tags to entries left')
          logging(ln, count)

      }

    }
  }

}



}

const prepareTags = async (tag) => {
  // console.log("getting user json")
  const {id} = await getUser();
   if (typeof tag === "string") return { name: tag, userId:id}; 
     tag.userId = id;
     return tag;

} 

const prepareEntries = async (data) => { 
   return data.map((obj) => {
      
      const { title, entry,  tags, topicId, id } = obj;
      //problem issue
      const preppedTags = tags.map(prepareTags);
      return {
        title,
        entry,
        tags: preppedTags,
        topicId,
        id
      }
   })
}




module.exports.test = async (req,res) => {

  const data =[
    {
      "title":"t1",
      "entry":"t1",
      "tags":[
          // {
          //   name: 't1',
          //   userId: 3,
          //   id: 3,
          // },
          {
            name: 't2',
            userId: 3,
            id: 4,
          },
          {
            name: 'w7',
            userId: 3,
            id: 19,
          },
          {
            name: 'q6',
            userId: 3,
            id: 14,
          },
          // {
          //   name: 't5',
          //   userId: 3,
          //   id: 10,
          // },

        ],
      "topicId":"3",
      "id":25
    },
    {
      "title":"t2",
      "entry":"t2",
      "tags":[
          {
          name: 't3',
          userId: 3,
          id: 5,
          },
          {
            name: 't4',
            userId: 3,
            id: 6,
          },
          {
            name: 't2',
            userId: 3,
            id: 4,
          },
          // {
          //   name: 't1',
          //   userId: 3,
          //   id: 3,
          // },
          // {
          //   name: 't5',
          //   userId: 3,
          // },
          // {
          //   name: 't6',
          //   userId: 3,
          // },
          // {
          //   name: 'w7',
          //   userId: 3,
          // },
          // {
          //   name: 'q6',
          //   userId: 3, 
          // },


      ],
      "topicId":"3",
      "id":26
    }
  ];

  let status = "update";
  let topicId = 3;
   
  await processEntries(data, status)
  const data2 = await getEntries(topicId);
  res.json(data2);
}


module.exports.create = async (req,res,next) => {
    logging('api', req.originalUrl)
     console.log(req.body)

  

    //  if(!Array.isArray(req.body)) {
    //     const msg = 'request body is not an array';
    //     logging('error', msg);
    //    return res.status(400).send(msg);
    //  }

    const { userId, topicId, entries } = req.body;
    const bulkUpdate = entries.filter( e => !!(e?.id) === true);
    const bulkCreate = entries.filter( e => !!(e?.id) === false);

    console.log('creating')
    console.log(bulkCreate)
    console.log('updating')
    console.log(bulkUpdate)

    const createPrep = await prepareEntries(bulkCreate);
    const updatePrep = await prepareEntries(bulkUpdate);

    console.log('createPrep')
    console.log(createPrep)  
    console.log('updatePrep')
    console.log(updatePrep)

    //  await processEntries(createPrep, 'create');
    //  await processEntries(updatePrep, 'update');

    //  const data = await getEntries(topicId);
    //  res.json(data);

}


module.exports.index = async (req, res) => {
    logging('api', req.originalUrl)

    // console.log(req.params)
    const {id} = req.params;

    const data = await getEntries(id);
    res.json(data);

}



