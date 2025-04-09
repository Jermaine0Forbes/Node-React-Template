const  { Entries, Tags, TagsToEntries } = require("../models/index");
const { logging, loggingV2, getUser } = require('../../utils/index');
const { validationResult } = require('express-validator');
const bcrypt = require("bcrypt");
const dotenv = require('dotenv');
const jwt = require('jsonwebtoken');
const {Model} = require('sequelize');
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
  const lv2 = loggingV2;

  if(!onlyStatuses.includes(status)){
    lv2(ln, 'status provided does not exist')
    return false;
  }

  if(!global?.userId){
    lv2(ln, 'global userId does not exist')
    const {id: userId} = await getUser();
    global.userId = userId;
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
      lv2(ln, 'the current entry is')
      lv2(ln, ec)
      
      
  
      let us = updateStatus == 1 ? 'updated successfully' : 'update went wrong';
      lv2(ln, `entry ${entryId}: ${us}`)
      
      

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
     lv2(ln, 'the current entry is')
     lv2(ln, ec)
     
     
     entryId = ec.id;
  }


  entryTags = entry?.tags;

  if(entryTags) {
    lv2(ln, 'entryTags, count:'+ entryTags.length)
    

      for(let tag of entryTags) {

        let existingTags;
        let et;
        let count;

        lv2(ln, 'entryId')
        lv2(ln, entryId)
        
        

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
        lv2(ln, 'existingTags count:'+ et.length)
        lv2(ln, existingTags)
        
        

        /*
          The tag names that are associated with the entry
        */
        exNames = et.map(e =>  e.name);
        lv2(ln, 'existing names count:'+ exNames.length);
        lv2(ln, exNames);
        
        


        /*
          The tags that currently are not associated with the entry
          in the database
        */
        let diffTags = entryTags.filter( ent => !exNames.includes(ent.name));
        let dt = diffTags;
        lv2(ln, 'different tags')
        lv2(ln, dt)
        
        


        /*
        The tags that already exist, but need to be added to the entry
        */

        let addedTags = dt.filter(ent => ent.hasOwnProperty('id'));
        let at = addedTags;
        lv2(ln, 'added tags, count:'+ at.length);
        lv2(ln, at);
        
        


        /*  
          The list of every tag name that has been created
        */
        let allTags = await Tags.findAll({ attributes:['name']});
        let allTagNames = allTags.map(tag => tag.name);
        let atn = allTagNames;
        lv2(ln, 'all of the tag names')
        lv2(ln, atn)
        
        

        /*  
          The tags that have not been created yet
        */
        let newTags = dt.filter(ent => !ent.hasOwnProperty('id') && !atn.includes(ent.name));
        let nt = newTags;
        lv2(ln, 'new tags, count:'+nt.length);
        lv2(ln, nt);

        /*  
          The tags that exist, but they don't have id's
        */
        let noIdTags = dt.filter(ent => !ent.hasOwnProperty('id') && atn.includes(ent.name));
        let nit = noIdTags;
        lv2(ln, 'tags with no ids, count:'+nit.length);
        lv2(ln, nit);


        /*
          If there are tags that exist, but they don't carry an id. 
          We query the tag, attach the userId to it
          and add it to the addedTags variable
        */
        if(nit.length){
          
          for(let tag of nit) {

           let found =  await Tags.findOne({
                where:{
                  name: tag.name,
                },
                attributes: ['name', 'id'],
                logging: (sql) => {
                  logging('sql', sql);
                
                }
              });

            if( found !== null) {
              lv2(ln, 'found tag :'+tag.name);
              let f = found.toJSON()
              lv2(ln, f);
              f.userId = global.userId;
              at.push(f)
            }else{
              lv2(ln,'could not find tag :'+tag.name);
            }

          }
        }


        /*
            The tag names that are associated with the entry
            from the post request
        */
        let newNames = entryTags.map(e => e.name);
        let nn = newNames;
        lv2(ln, 'list of names of the new tags');
        lv2(ln, nn)
        
        

        /*
          The tags that need to be removed from the entry
        */

        let removedTags = et.filter( ent => !nn.includes(ent.name));
        let rt = removedTags;
        lv2(ln, 'removed tags count:'+ rt.length)
        lv2(ln, rt)
        
        

        /*
        If there are any existing tags, add them to entry
        */
        if(addedTags.length > 0 ){

          count = await ec.countTagsToEntries();
          lv2(ln, 'total of tags to entries')
          lv2(ln, count)
          
          

          let tranformAddedTags = at.map( tag => ( { userId: tag.userId, entryId, tagId: tag.id }));
          let tat = tranformAddedTags;
          lv2(ln, 'added tags that have been transformed');
          lv2(ln,tat)
          
          

          // console.log('attempting to add tags to entries')
          lv2(ln, 'attempting to add tags to entries')
          let tte = await TagsToEntries.bulkCreate(tat,{
            logging: (sql) => {
              logging('sql', sql);
            
            }
          });

          count = await ec.countTagsToEntries();
          // console.log('number of tags to entries left')
          // console.log(count)
          lv2(ln, 'number of tags to entries left')
          lv2(ln, count)

        }

        /*
          If are any new tags, create them first, then add them to the entry
        */
        if(newTags.length > 0) {
          count = await ec.countTagsToEntries();
          // console.log('total of tags to entries')
          // console.log(count)
          lv2(ln, 'total of tags to entries')
          lv2(ln, count)

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
              lv2(ln, 'new tag that have been transformed')
              lv2(ln, tnt)

              // console.log('attempting to create a tags to entries row')
              lv2(ln, 'attempting to create a tags to entries row')
              await ec.createTagsToEntry(tnt)
            }

            count = await ec.countTagsToEntries();
            // console.log('number of tags to entries left')
            // console.log(count)
            lv2(ln, 'number of tags to entries left')
            lv2(ln, count)
    

        
        }

        /*
          If certain tags that were present with an entry doesn't exist anymore
          then remove them
        */
        if(removedTags.length > 0 ) {

          count = await ec.countTagsToEntries();
          // console.log('total of tags to entries')
          // console.log(count)
          lv2(ln, 'total of tags to entries')
          lv2(ln, count)

          let transformRemovedTags = rt.map( tag => ( { entryId, tagId: tag.id }));
          let trt = transformRemovedTags;
          // console.log('removed tags that have been transformed')
          // console.log(trt);
          lv2(ln, 'removed tags that have been transformed')
          lv2(ln, trt)

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
          lv2(ln, 'number of tags to entries left')
          lv2(ln, count)

      }

    }
  }

}



}

const prepareTags = (tag, userId) => {
  // console.log("getting user json")
   if (typeof tag === "string") return { name: tag, userId: userId}; 
     tag.userId = userId;
     return tag;

} 

const prepareEntries = (data, userId) => { 
   return  data.map((obj) => {
      
      const { title, entry,  tags, topicId, id } = obj;
      const preppedTags = tags.map((tag) => prepareTags(tag, userId));
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

  const data = {
    userId: 3,
    topicId: '6',
    entries: [
      {
        // id: 25,
        title: 'foo2',
        entry: 'foo2',
        tags: [
          {
            name: 'qw',
            userId: 3,
          },
          {
            name: 't1',
            userId: 3,
          },
        ],
        order: '6aa178e4-8f97-4087-b5c4-0ca03c907e21',
        topicId: '6'
      },
      {
        // id: 26,
        title: 'foo3',
        entry: 'foo3',
        tags: [
          {
            name: 'qw',
            userId: 3,
          },
          {
            name: 'qe',
            userId: 3,
          },
          {
            name: 'qr',
            userId: 3,
          },
        ],
        order: '076f61a3-6f35-4bb8-b0a5-5330ac3790a6',
        topicId: '6'
      },

    ]
  };

  // const tags = await Tags.findAll({
  //   attributes: { exclude:['termId', 'createdAt', 'updatedAt', 'tags-to-entries']} ,
  //   logging: (sql,queryObject) => {
  //     logging('sql', sql);
     
  //   },
  // });

  // console.log(Array.isArray(tags))
  // console.log(tags instanceof Model)
  // console.log(tags[0].toJSON())
   let topicId = 6;
   let userId = 3;

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

    global.userId ??= userId;

    console.log('creating')
    console.log(bulkCreate)
    console.log('updating')
    console.log(bulkUpdate)

    const createPrep =  prepareEntries(bulkCreate, userId);
    const updatePrep =  prepareEntries(bulkUpdate, userId);

    console.log('createPrep')
    console.log(createPrep)  
    console.log('updatePrep')
    console.log(JSON.stringify(updatePrep,null,2));

     await processEntries(createPrep, 'create');
     await processEntries(updatePrep, 'update');

     const data = await getEntries(topicId);
     res.json(data);

}


module.exports.index = async (req, res) => {
    logging('api', req.originalUrl)

    // console.log(req.params)
    const {id} = req.params;

    const data = await getEntries(id);
    res.json(data);

}



