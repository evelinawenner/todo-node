const express = require("express");
const app = express();
require("dotenv").config();
const router = require("./routes/todoRoute.js")



app.use("/static", express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set("view engine", "ejs");
app.use("/", router);

const mongoose = require("mongoose");
//connection to db
mongoose.set("useFindAndModify", false);
mongoose.connect(process.env.DB_CONNECT, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
console.log("Connected to db!");
app.listen(5000, () => console.log("Server Up and running"));
});



