// const 
// goose = require("mongoose"),
// User = goose.model("Users");
const  { Users } = require("../models/index");

module.exports.index = async (req,res) => {
   const users = await Users.findAll({ attributes : ['id','username', 'adminLevel']});
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
    
    if( typeof Number(id)  !== "number")
    {
        return res.error("id is not a number");
    }
    const user = await Users.findByPk(id,{ attributes: ['adminLevel','email', 'id', 'username']});

    if(user === null){
        console.error("cannot find user "+id);
    }

    return res.json(user);
}


module.exports.put = async (req, res) =>{
    console.log(req.path)
    const id = req.params.id;
    const {adminLevel, email, username} = req.body;
    console.log(req.body)
    if( typeof Number(id)  !== "number")
    {
        return res.error("id is not a number");
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
  const id = req.params.id;
  console.log("deleting")
  console.log('id: '+id);
}