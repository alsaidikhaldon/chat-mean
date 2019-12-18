const express = require('express');
const User = require('../models/user.model');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const passport = require('passport')


// user login 




exports.userLogin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) { 
            return res.status(501).json(err); 
        }
        if (!user) {
            return res.status(501).json(info)
        }
        req.logIn(user, function (err) {
            if (err) { 
                return res.status(501).json(err);
             }
             let returnUser = {
               email: user.email,
                id: user._id
            }

            return res.send({
                success: true,
                msg: " Logged In Successfully! ",
                user: returnUser,
                success: true
        
            });
        });
    })(req, res, next);
};

// user Register 


exports.userRegister = (req, res, next) => {
    
    // test if user exist already
    User.findOne({email : req.body.email}, (_err, user) => {

        if (_err) {
            return res.send({
                success: false,
                msg: "error , try agin .. ",
            });
        }
        if (user) {
            return res.send({
                success: false,
                msg: "email registered ... login or try ",
            });
        } else {

            //CREAT new user object
            let newUser = new User({
                firstName: req.body.firstName,
                lastName: req.body.lastName,
                email: req.body.email,
                password: req.body.password
            });

             //SAVE new user object

            newUser.save((err, user) => {
                if (err) {
                    return res.send({
                        success: false,
                        msg: "new user save error ....!!",

                    });
                }
                res.send({
                    success: true,
                    msg: "new user save with succes ....  Congratulations ",
                    newuser: user
                });

            });



        }

    });
    

};



// logout

exports.userLogout = (req, res, next) => {
    req.logout();
  return res.status(200).json({message:'Logout Success'});
    

};








// delet

exports.userDelet = (req, res, next) => {
    res.send("im a delet  route from controller    ...***************  ");

};


// user by id 

exports.userById = (req, res, next) => {
    res.send("im a user by id route from controller  ...********** gggggg* dd****");
};


// login with token --- can not athunitfiacation

// exports.userLogin = (req, res, next) => {
    
//     const mailx = req.body.email;
//     const password = req.body.password;

//     query = { email: mailx };

//     User.findOne(query, (err, user) => {

//         if (err) {
//             return res.send({
//                 success: false,
//                 msg: "error , try agin .. ",
//             });
//         }

//          // if user compare password client with hash password in data
//          if (!user || !bcrypt.compareSync(password, user.password)) {
//             return res.send({
//                 success: false,
//                 msg: " user not found or passowrd invalid ..!! "
//             });
//         } else {

//               // user is valid
//        const token = jwt.sign({ user }, process.env.SECERT, { expiresIn: process.env.TOKEN_DURATION });
//        jwt.verify(token, process.env.SECERT, function(err, data){
//         console.log(err, data);
//    })

//        // create return User "with out password"
//        let returnUser = {
//            firstName : user.firstName,
//            email: user.email,
//            id: user._id
           
          
//          }

//            return res.send({
//                success: true,
//                msg: " Logged In Successfully! ",
//                user : returnUser,
//                token: 'bearer ' + token,
//                success: true,
//                user: returnUser
               
//            });
//         }

     

           
        
//     });
// };
