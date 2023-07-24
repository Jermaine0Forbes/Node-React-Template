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
    console.log('id')
    console.log(id)
    if( typeof Number(id)  !== "number")
    {
        return res.error("id is not a number");
    }
    const user = await Users.findByPk(id);

    if(user === null){
        console.error("cannot find user "+id);
    }

    return res.json(user);
}