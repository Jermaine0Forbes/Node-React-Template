const 
goose = require("mongoose"),
User = goose.model("Users");
     

module.exports.index = (req,res) => {
    res.render("home/index");
}

module.exports.storeUser = (req, res) => {
    User.create(req.body, (err, data) => {
        if(err) return res.send(err)

        console.log(data)
        res.redirect("/users")
    })
}