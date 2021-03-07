const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");
const todoRoute = require("./routes/todoRoute")
const userRoute = require("./routes/userRoute")
require("dotenv").config();
const app = express();



//app middlewares
app.set("view engine", "ejs");
app.use("/static", express.static("public"));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: false }))
//router middlewares
app.use("/", todoRoute);
app.use(userRoute);

//för att kunna parsa/konvertera json-data till js

//för att kunna parsa/konvertera ejs-data till js



const options = { 
    useNewUrlParser: true,
useUnifiedTopology: true,
useFindAndModify: false,
useCreateIndex: true,
}

//connection to db
mongoose.connect(process.env.DB_CONNECT, options, (err) => {
    if (err) {
        console.log(err);
        return;
    }
console.log("Connected to db!");
app.listen(5000, () => console.log("Server Up and running"));
});



