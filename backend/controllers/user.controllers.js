const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
var bcrypt = require('bcryptjs');




// user login 
exports.userLogin = (req, res, next) => {
    
    const x = req.body.email;
    const password = req.body.password;

    query = { email: x };

    User.findOne(query, (err, user) => {

        if (err) {
            return res.send({
                success: false,
                msg: "error , try agin .. ",
            });
        }

        if (!user) {
            return res.send({
                success: false,
                msg: " user not found!! "
            });
        }
        
        // if user compare password client with hash password in data
        if (user && bcrypt.compareSync(password, user.password)) {
            return res.send({
                success: true,
                msg: " pass match ... u can login!! "
            });
        } else {
            return res.send({
                success: true,
                msg: " pass  invalid  ... u can't login!! "
            });

        };
       
       
        
       
      

    });


};


// user Register 



exports.userRegister = (req, res, next) => {

    //CREAT new user object
    let newUser = new User({
        firstName: req.body.firstName,
        lastName: req.body.lastName,
        email: req.body.email,
        password: req.body.password,
        age: req.body.age
    });

    

    //SAVE new user object

    newUser.save((err, user) => {
        if (err) {
            return res.send({
                success: false,
                msg: "save error ....!!",

            });
        }
        res.send({
            success: true,
            msg: "save succes ....  Congratulations ",
            newuser1: user
        });

    });

    console.log(" the new user info -> :  " + newUser);
};



// delet

exports.userDelet = (req, res, next) => {
    res.send("im a delet  route from controller    ...***************  ");

};


// user by id 

exports.userById = (req, res, next) => {
    res.send("im a user by id route from controller  ...********** gggggg* dd****");
};




