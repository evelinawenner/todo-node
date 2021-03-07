const User = require("../models/user");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

require("dotenv").config();

const loginRender = (req, res)=>{
    res.render("login.ejs", {err:" "})

}
// render : visas node js data med en template , 
// redirect : flytta till befientlig route  
const loginSubmit = async(req, res)=> {
    // read from req.body 
    const {email, password} = req.body;
    // kolla upp i databasen om användare finns
    const user = await User.findOne({email:email});

    if (!user) return res.redirect("/register");

    // jämför vi lösenord bcrypt.compare
    const validUser = await bcrypt.compare(user.password, password)

    if (!validUser) return res.redirect("/login")
    // låter användare logga in 
        //jwt 

        const jwtToken=  await  jwt.sign( {user:user}, process.env.SECRET_KEY )

        if(jwtToken) {
           const cookie = req.cookies.jwtToken
       
           if(!cookie) {
               res.cookie("jwtToken", jwtToken, {maxAge:360000000, httpOnly:true} )
       
           }
        
           return res.redirect("/")
        }

        return res.redirect("/login")
        

}
module.exports = {
    loginRender, 
    loginSubmit
}