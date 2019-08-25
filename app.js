const express = require('express');
const postRoute = require('./routes/post');
const server = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
//const expressValidator = require('express-validator');
dotenv.config();

const mongoUrl = require('./config/config').mongoUrl;

//db
mongoose.connect(mongoUrl, {useCreateIndex: true,useNewUrlParser: true }, err => {
    if (err) {
      console.log("mongo connection lost: " + err)
       // log.error("mongo connection lost: " + err);
        return
    }

    console.log("mongo connection done. ")
   // log.info("mongo connection done.");
    
    const db = mongoose.connection;
    return db;
});




// const myOwnMiddleWare = (req,res,next)=>{
//     console.log("middleware");
//     next();
// }


// middlewares
server.use(morgan("dev"));
server.use(bodyParser.json());
//server.use(expressValidator());


//server.use(myOwnMiddleWare);
server.use("/",postRoute);
//server.use("post",postRoute);

const port = process.env.PORT || 9090
server.listen(port,()=>{
    console.log('Node js API listening   on port: '+ port)
});