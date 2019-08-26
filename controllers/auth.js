const User = require('../models/user');
const jwt = require('jsonwebtoken');
//require('.dotenv').config();

exports.signup = async (req,res)=>{
    const userExist = await User.findOne({email:req.body.email})
    if(userExist) return res.status(403).json({
        email:"email is taken"
    })
    const user = await new User(req.body);
    await user.save();
    res.status(200).json({message: "signup success! Please login"})
};
exports.signin = (req,res)=>{
    // find user based on email
    const {email,password} = req.body;
    User.findOne({email},(err,user)=>{
       // if error no user
       if(err || !user){
           return res.status(401).json({
               error:"User with that email does not exist. Please signin."
           })
       }
       // if user found make sure the email and password match
       // create authenticate method in user model ans use here
       if(!user.authenticate(password)){
           return res.status(401).json({
               error:"Email and password not match"
           })
       }
       // generate token with user id and secret
       const token = jwt.sign({_id:user._id},process.env.JWT_SECRET)
     res.cookie("t",token,{expire:new Date()+999})
     const {_id,name,email} = user
     return res.json({token,user:{_id,name,email}})
    })


}
exports.signout = (req,res)=>{
    res.clearCookie("t")
    return res.json({message:"Signout success"})
}