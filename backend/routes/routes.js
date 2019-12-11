const express = require('express');
const router = express.Router();

const usersControll = require('../controllers/user.controllers')



// MAIN home *********
//router.get('/',userLogin);

// LOGIN *********
router.get('/login', usersControll.userLogin);

// REGISTERATION *********

router.get('/register', usersControll.userRegister);

// DELEt *********

router.get('/delet/:id', usersControll.userDelet);

// USER by id *********

router.get('/user/:id?', usersControll.userById );




module.exports = router ;