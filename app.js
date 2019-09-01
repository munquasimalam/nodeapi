const express = require('express');
//const corsMiddleware = require('restify-cors-middleware')
var corsexpress = require('cors');
const postRoutes = require('./routes/post');
const authRoutes = require('./routes/auth');
const userRoutes = require('./routes/user');
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
const cors = corsexpress({
  preflightMaxAge: 5, //Optional
  origins: ['*'],
  allowHeaders: ['Access-Control-Allow-Headers','access-control-allow-origin','Content-Type']
});
//server.pre(cors.preflight);
server.use(cors);




//server.use(myOwnMiddleWare);
server.use("/",postRoutes);
server.use("/",authRoutes);
server.use("/",userRoutes);
server.use(function (err, req, res, next) {
    if (err.name === 'UnauthorizedError') {
      res.status(401).json({error:"Unauthorized!"});
    }
  });

const port = process.env.PORT || 9090
server.listen(port,()=>{
    console.log('Node js API listening   on port: '+ port)
});