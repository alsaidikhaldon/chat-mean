const mongoose = require('mongoose');




// structure of class user
const MessageSchema = new mongoose.Schema({
    authorName : String,
    authorId : String,
    content :  { type: String, maxlength: 250 },
    date : Date,
    isdeliver : Boolean
});





const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;



