const express = require('express');
const User = require('../models/user.model');


const passport = require('passport')




//***************************************************************** */
//***************************  // user login  ************************************** */ 


exports.userLogin = function (req, res, next) {
    passport.authenticate('local', function (err, user, info) {
        if (err) {
            return res.send(err);
        }
        if (!user) {
            return res.send(info)
        }
        req.logIn(user, function (err) {
            if (err) {
                return res.send(err);
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


//***************************************************************** */
//***************************  user Register  ************************************** */   


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
                msg: "email registered ... login or try anothr email ! ",
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


//***************************************************************** */
//***************************  user logout  ************************************** */ 

exports.userLogout = (req, res, next) => {
    req.logout();
  return res.status(200).json({success: true, msg: ' Logout Success ...'});
  //res.send({success: true, msg:" Logout Success ..."});
    

};





 //***************************************************************** */
// *************** logged user (retuen first and last name ) ******************* */

exports.user = function (req, res, next) {
    let returnUser = {
        id : req.user.id,
        firstName: req.user.firstName,
        lastName: req.user.lastName
    }

    
    return res.send({
        success : true,
        user : returnUser
    });

};



 //***************************************************************** */
// *************** get all users ******************* */

exports.allUsers = function (req, res, next) {

    var cuurentUser = req.user.id;

    var query = User.find({ _id: { $ne: cuurentUser } }).select({ "firstName": 1,"lastName": 1,  "_id": 1});
    query.exec(function (_err, users) {
        if (_err) {
            return res.send({
                success: false,
                msg: "error , try agin .. ",
            });
        }
        
        
        return res.send({
            success: true,
            users : users
        });

        
    })

   
}
    



// delet

exports.userDelet = (req, res, next) => {
    res.send("im a delet  route from controller    ...***************  ");

};


// user info  by id 

exports.getUserInfoById =  (req, res, next) =>{
   let userId = req.params.userId;

   User.findById({ _id : userId}).exec( function(err, info){
    if (err) {
        return res.send({
            success: false,
            msg: " error retrive  user info  ....!!",
        });
    }

    return res.send({
        success : true,
       info : info
    });
 
});
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
