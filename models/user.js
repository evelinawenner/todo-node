const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({

    name: {type:String, required:true, unique:true},
    email: {type:String, required:true, unique:true},
    password: {type:String, required:true},
    role: {type:String} 
    //här kan jag köra role: Boolean, true ->lärare

})

const User = mongoose.model("user", userSchema);

module.exports = User;