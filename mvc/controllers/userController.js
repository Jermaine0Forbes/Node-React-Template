const 
goose = require("mongoose"),
User = goose.model("Users");
     

module.exports.index = (req,res) => {
    User.find({})
    .lean()
    .exec((err, users) => {
        if(err) res.send(err)
        console.log(users)
        res.render("user/index", {users:users});
    })
    
}