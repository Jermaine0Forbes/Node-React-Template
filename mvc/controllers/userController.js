const  { Users } = require("../models/index");
const { logging, invalidNumber, noUser, generateAccessToken } = require('../../utils/index');
const { validationResult } = require('express-validator');


module.exports.index = async (req,res) => {
   const users = await Users.findAll({ 
    attributes : ['id','username', 'adminLevel'],
    logging: (sql) => {
      logging('sql', sql);
    }
  });
   logging('api', req.originalUrl)
   return res.json({users: users});

}

module.exports.get = async (req,res) => {
    const id = req.params.id;
    const invalid = validationResult(req);

    logging('api', req.originalUrl)

    if(!invalid.isEmpty())
    {
        console.error(invalid.array())
        return res.status(400).send(invalid.array());
    }

    if(invalidNumber(id))
    {
      msg = `id:${id} is invalid`;
      console.error(msg);
      return res.status(400).send(msg);
    }
    
    const user = await Users.findByPk(id,{ 
      attributes: ['adminLevel','email', 'id', 'username'],
      logging: (sql) => {
        logging('sql', sql);
      }
    });

    if(noUser(user)){
        msg = "cannot find user "+id
        console.error(msg);
        return res.status(400).send(msg);
    }

    return res.json(user);
}


module.exports.put = async (req, res) =>{

    logging('api', req.originalUrl)
    const id = req.params.id;

    if(invalidNumber(id))
    {
        return res.sendStatus(400);
    }
    // Need to sanitize or check the inputs of req.body
   Users.update(req.body, {
        where: {id:id},
        logging: (sql) => {
          logging('sql', sql);
      }
      })
      // .then( (role) => {
      //   res.status(200).send(role)

      // }).catch( (err) => {
      //   res.status(400).send(err)
      // });



    if(req.body?.currentUser){

      const user = await Users.findByPk(id,{ 
        attributes: ['adminLevel','email', 'id', 'username'],
        logging: (sql) => {
          logging('sql', sql);
        }
      });

      console.log('user data')
      console.log(user.dataValues)

      return res.send(generateAccessToken(user.dataValues));
    }

    return res.sendStatus(200);
}

module.exports.delete = async (req, res) => {
  logging('api', req.originalUrl)
  const id = req.params.id;

  if(invalidNumber(id))
  {
      return res.sendStatus(400);
  }

  await Users.destroy({
    where: {
      id: id,
    },
    logging: (sql) => {
      logging('sql', sql);
  }
  })

  return res.sendStatus(200);
}