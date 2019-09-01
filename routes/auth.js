const express = require('express');
const {signup,signin,signout} = require('../controllers/auth');
const {userById} = require('../controllers/user');


//const {userSignupValidation} = require('../validator');


const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);
// any route containing userId: our app first execute userById
router.param('userId', userById);

module.exports = router;

