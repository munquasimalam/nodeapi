const express = require('express');
const {signup,signin,signout} = require('../controllers/auth');
const {userSignupValidation} = require('../validator');


const router = express.Router();
router.post('/signup', signup);
router.post('/signin', signin);
router.get('/signout', signout);

module.exports = router;

