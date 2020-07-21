const express = require('express');
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


    body('pincode').trim().isLength({min:6}),
    body('name').trim().not().isEmpty(),
    body('address').trim().not().isEmpty(),
    body('pincode').trim().not().isEmpty(),
    body('city').trim().not().isEmpty(),
    body('state').trim().not().isEmpty()

], createCustomer);


//Category
router.get('/category', getCategory);
router.get('/subcategory/:category', getSubcategoryByCategory);

router.get('/product', getProduct);
router.get('/product/:_id', getProductById);
router.get('/product/sub/:subcategory', getProductBySubcategory);




module.exports = router;