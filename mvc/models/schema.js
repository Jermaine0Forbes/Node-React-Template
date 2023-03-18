const goose = require('mongoose');
const schema = goose.Schema;

// Defines a user schema
const user = new schema({
    username: String,
    password: String,
    
}, {
 timestamps:true
});


goose.model("Users", user);
