const express = require('express');
const Message = require('../models/message.model');
const Conversation = require('../models/conversation.model');
const User = require('../models/user.model');








 //***************************************************************** */ 5e043b0fb166bb1c9090fc72
// *************** add new Message **********************************

exports.addMessage = async function (req, res, next) {


    msgConversation = await Conversation.findById(req.params.convid) ;
    //CREAT new user object
    let newMessage = new Message({

       

        sender: req.user,
        conversation : msgConversation,
        content: req.body.content,
        date: Date(Date.now()).toString(),
        isdeliver: false

    });

    // SAVE new user object

    newMessage.save((err, message) => {
        if (err) {
            return res.send({
                success: false,
                msg: " message cant save content is too long  ....!!",

            });
        }
        res.send({
            success: true,
            msg: "message save succes ....  Congratulations ",
            newMessage: message
        });

    });

    
     // push new conversation to user
     var userId = req.user.id;
     const UserById = await User.findById(userId);
     UserById.messages.push(newMessage);
     await UserById.save();
     
      // push new conversation to participant
      msgConversation.messages.push(newMessage);
     await msgConversation.save();

};





// *************** listing Messages by user session *******************

exports.listMessage = function (req, res, next) {


    Message.find({}, (err, messages) =>{
        if (err) {
            res.send({
                success : false,
                msg : 'Error while reteriving the messages .. '
            });
        }
        return res.send({
            success : true,
            messages
        });
    });


};



  


// ************ Messages BY  CONVERSATION *************************/

exports.getMessagesByConv = async  function (req, res, next) {



    Message.find({conversation : req.params.convid})
        .select({ "sender": 1,"content": 1, "date":1,  "_id": 0})
        .exec( function(err, messages){
        if (err) {
            return res.send({
                success: false,
                msg: " error retrive  conversations  ....!!",
            });
        }

        return res.send({
            success : true,
           // user : req.user,
           messages : messages
        });

       

    });
   
    

};


