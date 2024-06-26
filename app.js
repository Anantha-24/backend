const express = require("express");
const cors = require("cors");
const app = express();
const cookieParser = require("cookie-parser");
const bodyParser = require("body-parser");
const fileUpload = require("express-fileupload");
const path = require("path");



const errorMiddleware = require("./apps/middleware/error");

// Config
if(process.env.NODE_ENV !=="PRODUCTION"){
    require("dotenv").config({ path: "apps/config/config.env" });
  }

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser.urlencoded({extended: true}));
app.use(fileUpload());

//Route Imports
const product= require("./apps/routes/productRoute");
const user =require("./apps/routes/userRoute");
const order =require("./apps/routes/orderRoute");
const payment =require("./apps/routes/paymentRoute");

app.use("/api/v1",product);
app.use("/api/v1",user);
app.use("/api/v1",order);
app.use("/api/v1",payment);

app.use(express.static(path.join(__dirname,"../frontend/build")));

app.get("*",(req,res)=>{
    res.sendFile(path.resolve(__dirname,"../frontend/build/index.html"));
});

// Middleware for Errors
app.use(errorMiddleware);


module.exports = app;
