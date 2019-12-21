const express = require('express');
const Message = require('../models/message.model');




const JwtStrategy = require('passport-jwt').Strategy;
const ExtractJwt = require('passport-jwt').ExtractJwt;





 //***************************************************************** */
// *************** add new Message **********************************

exports.addMessage = function (req, res, next) {

    //CREAT new user object
    let newMessage = new Message({

        authorName: req.user.firstName,
        authorId: req.user.id,
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

};




 //***************************************************************** */
// *************** listing Messages by user session *******************

exports.listMessage = function (req, res, next) {


    Message.find({authorId : req.user.id }, (err, messages) =>{
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



  

