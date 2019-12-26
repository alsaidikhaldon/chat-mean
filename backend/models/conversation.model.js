const mongoose = require('mongoose');





const conversationSchema = new mongoose.Schema({
    created : Date,
    createBy :  { type: mongoose.Types.ObjectId, ref : 'User' },
    participant : { type: mongoose.Types.ObjectId, ref : 'User' },
    messages :[ {message : {  type: mongoose.Schema.Types.ObjectId,  ref:'Message' }} ]


});

const Conversation = mongoose.model('Conversation',conversationSchema ) ;

module.exports = Conversation;