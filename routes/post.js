const express = require('express');
const {getPost,createPost} = require('../controllers/post');
//const validation = require('../validator');
const router = express.Router();
router.get('/',getPost);
router.post('/post', createPost);

module.exports = router;

