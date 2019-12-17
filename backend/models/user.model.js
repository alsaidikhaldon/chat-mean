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




//  pre SAVE 
UserSchema.pre('save',function(next){

    // if password modified

    if (!this.isModified('password')) {
        return next();
    }

    
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


// validation password

UserSchema.methods.isPasswordValid = function(hashedpassword){
    return  bcrypt.compareSync(hashedpassword, this.password);
}






// create user entity
const User = mongoose.model('User', UserSchema);
module.exports = User;


