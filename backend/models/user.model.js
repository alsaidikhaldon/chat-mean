const mongoose = require('mongoose');



//class user
const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : { type : String, required : true },
    password : { type : String, required : true },
    age : Number
});

// user model
const User = mongoose.model('User', UserSchema);
module.exports = User;







