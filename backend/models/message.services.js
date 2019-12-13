const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const passport = require('passport')
const jwt = require('jsonwebtoken');





// add new Message

// user login 



exports.addMessage = passport.authenticate('jwt', { session: false }),(req, res, next) => {
    res.send("from add message");

   // const author = String;
    // const content = req.body.content ;
    // const date = "";
    // const isdeliver = false ;
 
};