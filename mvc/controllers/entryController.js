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
  

  console.log(tags)
  return {entries,tags}; 

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


  // const data =[
  //   {
  //     "title":"t1",
  //     "entry":"t1",
  //     "tags":[
  //         {
  //           name: 't1',
  //           userId: 3,
  //           id: 3,
  //         },
  //         {
  //           name: 't2',
  //           userId: 3,
  //           id: 4,
  //         },
  //         // {
  //         //   name: 't5',
  //         //   userId: 3,
  //         // },
  //         // {
  //         //   name: 't6',
  //         //   userId: 3,
  //         // },
  //         // {
  //         //   name: 't4',
  //         //   userId: 3,
  //         // },
  //       ],
  //     "topicId":"3",
  //     "id":25
  //   },
  //   {
  //     "title":"t2",
  //     "entry":"t2",
  //     "tags":[
  //         // {
  //         // name: 't3',
  //         // userId: 3,
  //         // id: 5,
  //         // },
  //         // {
  //         //   name: 't4',
  //         //   userId: 3,
  //         //   id: 6,
  //         // },
  //         {
  //           name: 't2',
  //           userId: 3,
  //           id: 4,
  //         },
  //         {
  //           name: 't1',
  //           userId: 3,
  //           id: 3,
  //         },
  //         // {
  //         //   name: 't5',
  //         //   userId: 3,
  //         // },
  //         // {
  //         //   name: 't6',
  //         //   userId: 3,
  //         // },
  //         {
  //           name: 'w7',
  //           userId: 3,
  //         },
  //         {
  //           name: 'q6',
  //           userId: 3, 
  //         },


  //     ],
  //     "topicId":"3",
  //     "id":26
  //   }
  // ];

  const data =[
    {
      "title":"t3",
      "entry":"t3",
      "tags":[
          {
            name: 't1',
            userId: 3,
            id: 3,
            tte : {
              userId: 3,
              tagId:3,
            },
          },
          {
            name: 't2',
            userId: 3,
            id: 4,
            tte : {
              userId: 3,
              tagId:3,
            },
          },
        ],
      "topicId":"3",
    },
  ];


  entry = await Entries.bulkCreate(data, {
    include: [
      {
        model:Tags,
        as: 'tags',
        attributes: ['name'],
        include: [
          {
            model: TagsToEntries,
            as: 'tte',
          }
        ]
      },
    ],
    logging: (sql, queryObject) => {
        logging('sql', sql);
       
      }

});

    let entry;
    let entryId;
    let topicId = 3;
    let userId = 3;
    let entryTags;
    let updateList = [];
    let status = 'update';
    let entryCurrent;

    Entries.hasMany(TagsToEntries, {
      foreignKey: 'entryId',
      attributes: [ 'userId', 'entryId', 'tagId']
    });
    TagsToEntries.belongsTo(Entries);
    Tags.hasMany(TagsToEntries);
    TagsToEntries.belongsTo(Tags);

  for(let i = 0; i > data.length;  i++) {
    entry = data[i]; 

    if (status === "update") {
       
        entryId = entry.id;
    
        updateList[i] = await Entries.update({
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
        let ec = entryCurrent;
        console.log('the current entry is')
        console.log(ec)
    
        console.log('updateList')
        console.log(updateList)

    } else if ( status === "create") {

       entryCurrent = await Entries.create(entry,{
          logging: (sql) => {
            logging('sql', sql);
          
          }
       });

       let ec = entryCurrent;
       console.log('the current entry is')
       console.log(ec)
       entryId = ec.id;
    }


    entryTags = entry?.tags;

    if(entryTags) {
      console.log('entryTags, count:'+ entryTags.length)

      for(let i = 0; i < entryTags.length;  i++) {
         let tag = entryTags[i];
         let ft;
         let existingTags;
         let et;
         let count;
  
  
         console.log('entryId')
         console.log(entryId)
  
  
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
         console.log('existingTags count:'+ et.length)
         console.log(existingTags)
  
         /*
           The tag names that are associated with the entry
         */
         exNames = et.map(e =>  e.name);
         console.log('existing names count:'+ exNames.length);
         console.log(exNames);
  
  
         /*
          The tags that currently are not associated with the entry
          in the database
         */
         let diffTags = entryTags.filter( ent => !exNames.includes(ent.name));
         let dt = diffTags;
  
   
         console.log('different tags')
         console.log(dt)
  
  
        /*
         The tags that already exist, but need to be added to the entry
        */
  
         let addedTags = dt.filter(ent => ent.hasOwnProperty('id'));
         let at = addedTags;
  
         console.log('added tags, count:'+ at.length);
         console.log(at);
  
  
         /*  
          The tags that have not been created yet
         */
         let allTags = await Tags.findAll({ attributes:['name']});
         let allTagNames = allTags.map(tag => tag.name);
         let atn = allTagNames;
         console.log('all of the tag names')
         console.log(atn)
         let newTags = dt.filter(ent => !ent.hasOwnProperty('id') && !atn.includes(ent.name));
         let nt = newTags;
  
         console.log('new tags, count:'+nt.length);
         console.log(nt);
  
         /*
            The tag names that are associated with the entry
            from the post request
         */
         let newNames = entryTags.map(e => e.name);
         let nn = newNames;
         
         console.log('list of names of the new tags');
         console.log(nn)
  
  
  
         /*
          The tags that need to be removed from the entry
         */
  
         let removedTags = et.filter( ent => !nn.includes(ent.name));
         let rt = removedTags;
  
         console.log('removed tags count:'+ rt.length)
         console.log(rt)
  
  
        if(addedTags.length > 0 ){
  
          count = await ec.countTagsToEntries();
          console.log('total of tags to entries')
          console.log(count)
  
          let tranformAddedTags = at.map( tag => ( { userId: tag.userId, entryId, tagId: tag.id }));
          let tat = tranformAddedTags;
          console.log('added tags that have been transformed');
          console.log(tat)
  
          console.log('attempting to add tags to entries')
          let tte = await TagsToEntries.bulkCreate(tat,{
            logging: (sql) => {
              logging('sql', sql);
             
            }
          });
  
          count = await ec.countTagsToEntries();
          console.log('number of tags to entries left')
          console.log(count)
  
        }
  
  
        if(newTags.length > 0) {
          count = await ec.countTagsToEntries();
          console.log('total of tags to entries')
          console.log(count)
  
            for(tag of newTags) {
  
            let  ct = await Tags.create({name: tag.name}, {
                logging: (sql) => {
                  logging('sql', sql);
                 
                }
               });
  
               let transfromNewTag = { userId: tag.userId, entryId, tagId: ct.id};
               let tnt = transfromNewTag;
  
               console.log('new tag that have been transformed');
               console.log(tnt)
  
               console.log('attempting to create a tags to entries row')
               await ec.createTagsToEntry(tnt)
            }
  
            count = await ec.countTagsToEntries();
            console.log('number of tags to entries left')
            console.log(count)
    
  
        
        }
  
  
        if(removedTags.length > 0 ) {
  
          count = await ec.countTagsToEntries();
          console.log('total of tags to entries')
          console.log(count)
  
           let transformRemovedTags = rt.map( tag => ( { entryId, tagId: tag.id }));
           let trt = transformRemovedTags;
           console.log('removed tags that have been transformed')
           console.log(trt);
  
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
          console.log('number of tags to entries left')
          console.log(count)
  
        }
  
      }
    }

  }

  const response = await getEntries(topicId);
   res.json(response);
}


module.exports.create = async (req,res,next) => {
    logging('api', req.originalUrl)
     console.log(req.body)

  

     if(!Array.isArray(req.body)) {
        const msg = 'request body is not an array';
        logging('error', msg);
       return res.status(400).send(msg);
     }
    const topicId = req.body[0].topicId;
    const bulkUpdate = req.body.filter( e => !!(e?.id) === true);
    const bulkCreate = req.body.filter( e => !!(e?.id) === false);
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

    writeJson(JSON.stringify(updatePrep), 'updatePrep');
     let data;
     let tag, x;
     const updateList = [];
     let updateTags = [];
     let entry;
     let entryId;
     let entryCreated;

     entryCreated = await Entries.bulkCreate(createPrep, {
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

     });

     console.log(entryCreated);
     logging('debug', JSON.stringify(entryCreated));


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

    for(let i = 0; i < bulkUpdate.length;  i++) {
        entry = bulkUpdate[i]; 
        entryId = entry.id;

        updateList[i] = await Entries.update({
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


        entryTags = entry.tags;

        for(let i = 0; i < entryTags.length;  i++) {
           let tag = entryTags[i];
           let ft;
           let existingTags;
           let et;

          existingTags = TagsToEntries.findAll({
            where:{
              entryId
            },
            logging: (sql, queryObject) => {
              logging('sql', sql);
             
            }
           });

           et = existingTags;

           writeJson(JSON.stringify(et), "existingTags");
          //  et.map(e => et.name)



          //  let [ foundTag , createdTag] = await Tags.find({
          //   where: { name : tag.name },
          //   defaults: tag,
          //   logging: (sql, queryObject) => {
          //     logging('sql', sql);
             
          //   }
          // });

          //  let [ foundTag , createdTag] = await Tags.findOrCreate({
          //   where: { name : tag.name },
          //   defaults: tag,
          //   logging: (sql) => {
          //     logging('sql', sql);
          //   }
          // });

          // ft = foundTag;
          // ct = createdTag;

          // await TagsToEntries.create(nTag, {
          //   logging: (sql) => {
          //     logging('sql', sql);
          //   }
          // });
      
          // logging('debug', JSON.stringify(nTag));


        } 


    }

    logging('debug', updateList);
     data = await getEntries(topicId);
    res.json(data);


    // res.json({ create: data, update: updateList});

}


module.exports.index = async (req, res) => {
    logging('api', req.originalUrl)

    // console.log(req.params)
    const {id} = req.params;

    const data = await getEntries(id);
    res.json(data);

}



