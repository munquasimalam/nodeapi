const express = require('express');
const {getPost,createPost} = require('../controllers/post');
const validator = require('../validator/index');
const router = express.Router();


//router.use(expressValidator())
router.get('/',getPost);
router.post('/post',createPost);

module.exports = router;

