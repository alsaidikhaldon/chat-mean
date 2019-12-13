const express = require('express');
const router = express.Router();

const usersServices = require('../models/user.services');
const messageServices = require('../models/message.services');
const passport = require('passport')


// MAIN home *********
//router.get('/',userLogin);

// LOGIN *********
router.post('/login', usersServices.userLogin);

// REGISTERATION *********

router.post('/register',usersServices.userRegister);
   



// DELEt *********

router.get('/delet/:id', usersServices.userDelet);

// USER by id *********

router.get('/user/:id?', usersServices.userById );


// add new message *********

//router.post('/message/add',messageServices.addMessage);

router.post('/message/add', passport.authenticate('jwt', { session : false}),  (req, res, next) => {

    res.send("from add message");
});

module.exports = router ;