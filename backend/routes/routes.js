const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controllers');
const messageControllers = require('../controllers/message.controllers');
const passport = require('passport')



// MAIN home *********



// *********** user LOGIN *********
router.post('/login', userControllers.userLogin);

//  ********** user LOGOUT *********
router.get('/logout',isUserAuth, userControllers.userLogout);

// *********** user REGISTERATION *********

router.post('/register',userControllers.userRegister);
   



// DELEt *********

//router.get('/delet/:id', userControllers.userDelet);

// USER by id *********

//router.get('/user/:id?', userControllers.userById );


// ************ message ADD NEW  *********
router.post('/message/add',isUserAuth, messageControllers.addMessage);

// ************  message LIST  *********
router.post('/message/list',isUserAuth, messageControllers.listMessage);



function isUserAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    else  return res.status(401).json({ message: 'Unauthorized Request' });
    
};






module.exports = router ;