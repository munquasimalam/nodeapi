const express = require('express');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const server = express();

const morgan = require('morgan');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const expressValidator = require('express-validator');

dotenv.config();

const config = require('./config/config');

//db
mongoose.connect(config.mongoUrl, {useCreateIndex: true,useNewUrlParser: true }, err => {
    if (err) {
      console.log("mongo connection lost: " + err)
       // log.error("mongo connection lost: " + err);
        return
    }

    console.log("connected with DB :"+config.database);
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
server.use(cookieParser());


//server.use(myOwnMiddleWare);
server.use("/",postRoutes);
server.use("/",authRoutes);

const port = process.env.PORT || 9090
server.listen(port,()=>{
    console.log('Node js API listening   on port: '+ port)
});