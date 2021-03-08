const User = require("../models/user");
const bcrypt = require("bcrypt");


const registerRender = (req, res)=>{

  
   res.render("register.ejs", {err:""});

}

const registerSubmit = async (req, res)=>{

    console.log(req.body);

 // Read data from req.body 
    const { name, email, password } = req.body;

    // spara lösenord med salt , bcrypt : hash password

    try {
    const salt = await bcrypt.genSalt(12);
    const hashedPassword = await bcrypt.hash(password, salt)

// vi ska skapa en new user utifrån den req.body data
 await new User({
     name:name, 
     email: email, 
     password:hashedPassword
 }).save();
 res.redirect("/login")
}

catch(err){
    if(err) return res.render("register.ejs", {err:err})
}

}


module.exports = {
    registerRender, 
    registerSubmit

}