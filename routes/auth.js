const express = require('express');
const {body} = require('express-validator');

const {signup, login} = require('../controller/auth');

const Admin = require('../model/auth');
const router = express.Router();

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return Admin.findOne({email: value})
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-mail already exist');
            }
        })
    })
    .normalizeEmail(),

    body('password').trim().isLength({min:5}),
    body('name').trim().not().isEmpty()
], signup);


router.post('/login', login);

module.exports = router;