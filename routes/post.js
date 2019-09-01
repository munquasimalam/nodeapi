const express = require('express');
const {getPost,createPost} = require('../controllers/post');
const {requireSignin} = require('../controllers/auth');
const validator = require('../validator/index');
const {userById} = require('../controllers/user');
const router = express.Router();


//router.use(expressValidator())
router.get('/',getPost);
router.post('/post',requireSignin,createPost);
// any route containing userId: our app will first execute userById
router.param('userId', userById);

module.exports = router;

