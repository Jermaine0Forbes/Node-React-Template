const  { Users } = require("../models/index");
const { logging } = require('../../utils/index');

module.exports.index = async (req,res) => {
   const users = await Users.findAll({ attributes : ['id','username', 'adminLevel']});
   logging('api', req.originalUrl)
   return res.json({users: users});
    // .then(res => {
    //     console.log(res)
    //     res.json({users: res});
    // })
    // .catch(err => console.log(err))
    // return res.json({users: [ 'john', 'jacob', 'smith']});
    // res.render("user/index", {users:[]});
    // User.find({})
    // .lean()
    // .exec((err, users) => {
    //     if(err) res.send(err)
    //     console.log(users)
    //     res.render("user/index", {users:users});
    // })
}

module.exports.get = async (req,res) => {
    const id = req.params.id;
    logging('api', req.originalUrl)
    if( typeof Number(id)  !== "number")
    {
      console.error(id+" is not a number");
      return res.sendStatus(500);
    }
    const user = await Users.findByPk(id,{ attributes: ['adminLevel','email', 'id', 'username']});

    if(user === null){
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
    if( typeof Number(id)  !== "number")
    {
       console.error(id+" is not a number");
        return res.sendStatus(500);
    }
    Users.update(req.body, {
        where: {id:id}
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

  if( typeof Number(id)  !== "number")
  {
     console.error(id+" is not a number");
      return res.sendStatus(500);
  }

  // equivalent of sleeping
  // await new Promise(resolve => setTimeout(resolve, 5000));
  await Users.destroy({
    where: {
      id: id,
    }
  })

  return res.sendStatus(200);
}