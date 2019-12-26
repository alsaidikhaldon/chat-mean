const mongoose = require('mongoose');





// structure of class user
const MessageSchema = new mongoose.Schema({
    sender : { type: mongoose.Types.ObjectId, ref : 'User' },
    conversation : { type: mongoose.Types.ObjectId, ref : 'Conversation' },
    content :  { type: String, maxlength: 250 },
    date : Date,
    isdeliver : Boolean
});





const Message = mongoose.model('Message', MessageSchema);
module.exports = Message;



//{ type: mongoose.Types.ObjectId, ref : 'User' }