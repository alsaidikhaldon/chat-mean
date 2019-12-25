const express = require('express');
const router = express.Router();

const userControllers = require('../controllers/user.controllers');
const messageControllers = require('../controllers/message.controllers');
const conversationController = require('../controllers/conversation.controller.js')
const passport = require('passport')



// MAIN home *********



// *********** user LOGIN *********
router.post('/login', userControllers.userLogin);

//  ********** user LOGOUT *********
router.get('/logout',isUserAuth, userControllers.userLogout);

// *********** user REGISTERATION *********

router.post('/register',userControllers.userRegister);
   

// *********** user USER Logged *********
router.get('/user', isUserAuth, userControllers.user);


// *********** user All USERs *********
router.get('/users',userControllers.allUsers);


// ************ message ADD NEW  *********
router.post('/message/add',isUserAuth, messageControllers.addMessage);

// ************  message LIST  *********
router.get('/message/list',isUserAuth, messageControllers.listMessage);





// ************   Conversation CREATE   *********
router.post('/conversation/create', conversationController.createConversation);


// ************   Get Conversation by USER   *********

router.get('/conversation/getbyuser', conversationController.getConversationByUser);




function isUserAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    else  res.send({ success: false, msg: ' Unauthorized ............' });
      //res.send({ success: false, msg: ' Unauthorized ............' });
      //res.status(401).json({success: false, msg: ' Unauthorized ............'});
  
    
    
};



router.get('/aa', (req, res) => {
  res.send("   user is ===> " + req.user + " conversation is ===> " + req.body.conversation );

});










module.exports = router ;