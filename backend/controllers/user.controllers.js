const express = require('express');




// user login 
exports.userLogin = (req, res, next) => {
    res.send("im a login route from controller   ...***************   ");

};


// user Register 



exports.userRegister = (req, res, next) => {
    res.send("im a Register route from controller  ...********** gggggg* dd****");

};



// delet

exports.userDelet = (req, res, next) => {
    res.send("im a delet  route from controller    ...***************  ");

};


// user by id 

exports.userById = (req, res, next) => {
    res.send("im a user by id route from controller  ...********** gggggg* dd****");
};




