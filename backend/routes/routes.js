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
   




// ************ message ADD NEW  *********
router.post('/message/add',isUserAuth, messageControllers.addMessage);

// ************  message LIST  *********
router.get('/message/list',isUserAuth, messageControllers.listMessage);



function isUserAuth(req, res, next) {
    if (req.isAuthenticated()) next();
    else  res.send({ success: false, msg: ' Unauthorized ............' });
      //res.send({ success: false, msg: ' Unauthorized ............' });
      //res.status(401).json({success: false, msg: ' Unauthorized ............'});
  
    
    
};






module.exports = router ;