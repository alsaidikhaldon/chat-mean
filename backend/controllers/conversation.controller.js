const express = require('express');
const Conversation = require('../models/conversation.model');
const User = require('../models/user.model');




// ************************ Create Conversation ********************** *//


exports.createConversation = async function (req, res, next) {

    convParticipant = await User.findById(req.params.participantid) ;

    //CREAT new Conversation object
    let newConversation = new Conversation({
        created :  Date(Date.now()).toString(),
        createBy : req.user,
        participant : convParticipant
       
    });
   

    // SAVE new Conversation object
    newConversation.save(async(err, conversation) =>  {
        
        if (err) {
            return res.send({
                success: false,
                msg: " conversation  cant save content is too long  ....!!",
            });
        }

        return res.json({
            success: true,
            msg: "message save succes ....  Congratulations ",
            conversation : conversation,
           
        });
    });


     // push new conversation to user
     var userId = req.user.id;
     const UserById = await User.findById(userId);
     UserById.conversations.push(newConversation);
     await UserById.save();
     
      // push new conversation to participant
      convParticipant.conversations.push(newConversation);
     await convParticipant.save();

};


// ************************ Get Conversations BY USER ********************** *//

exports.getConversationsByUser = async  function (req, res, next) {
    
    User.find()
        //.populate('conversations')
        .exec (function(err, conversations)  {

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
            //user : req.user,
            conversations
        });
    });
    // var userId = req.user.id;
    // const convsByUser = await  User.findById(userId).populate('conversations');
   

 

};




// ************ all conversation *************************/


exports.getAllConversations = async  function (req, res, next) {

    Conversation.find().exec( function(err, conversations){
        if (err) {
            return res.send({
                success: false,
                msg: " error retrive  conversations  ....!!",
            });
        }

        return res.send({
            success : true,
           // user : req.user,
           Conversations : conversations
        });

       

    });
   
    

};

