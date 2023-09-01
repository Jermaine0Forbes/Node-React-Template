const  { Users } = require("../models/index");
const { logging, invalidNumber, noUser } = require('../../utils/index');



module.exports.index = async (req,res) => {
   const users = await Users.findAll({ 
    attributes : ['id','username', 'adminLevel'],
    logging: (sql, queryObject) => {
      logging('sql', sql);
    }
  });
   logging('api', req.originalUrl)
   return res.json({users: users});

}

module.exports.get = async (req,res) => {
    const id = req.params.id;
    logging('api', req.originalUrl)
    if(invalidNumber(id))
    {
      return res.sendStatus(400);
    }
    const user = await Users.findByPk(id,{ 
      attributes: ['adminLevel','email', 'id', 'username'],
      logging: (sql, queryObject) => {
        logging('sql', sql);
      }
    });

    if(noUser(user)){
        console.error("cannot find user "+id);
        return res.sendStatus(500);
    }

    return res.json(user);
}


module.exports.put = async (req, res) =>{
    // console.log(req.path)
    logging('api', req.originalUrl)
    const id = req.params.id;
    console.log(req.body)
    if(invalidNumber(id))
    {
        return res.sendStatus(400);
    }
    Users.update(req.body, {
        where: {id:id},
        logging: (sql, queryObject) => {
          logging('sql', sql);
      }
      })
      .then( (role) => {
        console.log(role)

      }).catch( (err) => {
        console.log(err)
      });

    return res.sendStatus(200);
    //   user.then( resp =>{ 
    //     console.log(resp)
    //     res.sendStatus(200);
    // })
    //   .catch(err => { console.error(err)})

}

module.exports.delete = async (req, res) => {
  logging('api', req.originalUrl)
  const id = req.params.id;
  console.log("deleting")
  console.log('id: '+id);

  if(invalidNumber(id))
  {
      return res.sendStatus(400);
  }

  // equivalent of sleeping
  // await new Promise(resolve => setTimeout(resolve, 5000));
  await Users.destroy({
    where: {
      id: id,
    },
    logging: (sql, queryObject) => {
      logging('sql', sql);
  }
  })

  return res.sendStatus(200);
}