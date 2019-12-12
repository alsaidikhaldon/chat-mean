const mongoose = require('mongoose');
var  bcrypt = require('bcryptjs');



// structure of class user
const UserSchema = new mongoose.Schema({
    firstName : String,
    lastName : String,
    email : { type : String, required : true },
    password : { type : String, required : true },
    age : Number
});




UserSchema.pre('save',function(next){

    
    // generate salt 
    bcrypt.genSalt(10, (err, salt) => {
        if (err) {
        return next(err);
        }
       
         //use salt to hash password
        bcrypt.hash(this.password , salt, (err, hash) =>{
            if (err) {
           return next(err);
            }
         
        
            this.password = hash;
            next();
         });
 
    });


});







// create user entity
const User = mongoose.model('User', UserSchema);
module.exports = User;


