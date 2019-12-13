const mongoose = require('mongoose');




// structure of class user
const MessageSchema = new mongoose.Schema({
    author_id : String,
    content :  { type: String, maxlength: 5 },
    date : { type: Date, default: Date.now },
    isdeliver : Boolean
});





const User = mongoose.model('User', UserSchema);
module.exports = User;



