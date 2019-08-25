exports.createPostValidator = (req,res,next)=>{
    // title
req.check("Title","Write a Title").notEmpty();
req.check("Title","must be bet 4 to 150 char").isLength({
    min:4,
    max:150
});
// body
req.check("Body","Write a Body").notEmpty();
req.check("Body","must be bet 4 to 2000 char").isLength({
    min:4,
    max:2000
});
// check for error
const errors = req.validationErrors();
if(errors){
    const firstError = errors.map((error)=>error.msg)[0];
    return res.status(400).json({error:firstError})
}
// proceed to next middleware
next();
};