const express = require('express');
const Conversation = require('../models/conversation.model');
const User = require('../models/user.model');




// ************************ Create Conversation ********************** *//


exports.createConversation = function (req, res, next) {

    //CREAT new Conversation object
    let newConversation = new Conversation({

        created :  Date(Date.now()).toString(),
        

    });

    // SAVE new Conversation object

    newConversation.save((err, conversation) => {
        newConversation.users.push(req.user)
        if (err) {
            return res.send({
                success: false,
                msg: " conversation  cant save content is too long  ....!!",

            });
        }
        return res.json({
            success: true,
            msg: "message save succes ....  Congratulations ",
            conversation : conversation
        });

    });

};


// ************************ Get Conversation BY USER ********************** *//

exports.getConversationByUser =  function (req, res, next) {
    
    Conversation.find({}, (err, conversations) => {

        if (err) {
            res.send({
                success : false,
                msg : 'Error while reteriving the conversations by user .. '
            });
        }
        if (conversations == null) {
            res.send({
                success : false,
                msg : 'there is no  conversations yet '
            });
        }
        return res.send({
            success : true,
            user : req.user,
            conversations : conversations
        });
    });


};