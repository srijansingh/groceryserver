const express = require('express');
const {body} = require('express-validator');

const {
    getCategory,getSubcategoryByCategory,
    getProduct, getProductById,getProductBySubcategory,
    createCustomer
} = require('../controller/client');

const Customer = require('../model/customer');
const router = express.Router();

//Signup

router.put('/signup', [
    body('email')
    .isEmail()
    .withMessage('Please enter a valid email.')
    .custom((value, {req}) => {
        return Customer.findOne({email: value})
        .then(userDoc => {
            if(userDoc) {
                return Promise.reject('E-mail already exist');
            }
        })
    })
    .normalizeEmail(),
    
    body('mobile')
    .isNumeric()
    .isLength(10)
    .withMessage('Please enter valid number.')
    .custom((value, {req}) => {
        return Customer.findOne({mobile: value})
        .then(userMob => {
            if(userMob){
                return Promise.reject('Phone number already exist');
            }
        })
    }),

    body('pincode').trim().isLength(6).withMessage('Please enter valid pincode'),
    body('name').trim().not().isEmpty(),
    body('address').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('state').trim().not().isEmpty()

], createCustomer);


//Category

router.get('/category', getCategory);
router.get('/category/:_id', getSubcategoryByCategory);
router.get('/product', getProduct);
router.get('/product/:_id', getProductById);
router.get('/product/sub/:_id', getProductBySubcategory);


module.exports = router;