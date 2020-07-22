const Category = require('../model/category');
const Subcategory = require('../model/subcategory');
const Product = require('../model/product');
const Customer = require('../model/customer');
const Order = require('../model/order');
const {validationResult} = require("express-validator");

//Signup


exports.createCustomer = (req, res, next) => {
    const errors = validationResult(req);
    if(!errors.isEmpty()){
        const error = new Error('Validation failed.');
        error.data = errors.array();
        throw error;
    }

    const userid = req.body.userid;
    const mobile = req.body.mobile;
    const email = req.body.email;
    const name = req.body.name;
    const address = req.body.address;
    const pincode = req.body.pincode;
    const city = req.body.city;
    const state = req.body.state;
    
    const user = new Customer({
        userid : userid,
        mobile:mobile,
        email:email,
        name:name,
        address:address,
        pincode:pincode,
        city:city,
        state:state
    });

    user.save()
    .then(result => {
        res.status(201).json({
            message : 'User created'
           
        })
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })

}


//signupend



exports.getCategory = (req, res, next) => {
    Category.find()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}


exports.getProductByCategory = (req, res, next) => {
    const category = req.params._id;
    Product.find({"category" : `${category}`})
    .then(result => {
        if(!result){
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error;
          }
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}


//Blog
exports.getSubcategoryByCategory = (req, res, next) => {
    const category = req.params._id;
    Subcategory.find({"category" : `${category}`})
    .then(result => {
        if(!result){
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error;
          }
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}





//Product

exports.getProduct = (req, res, next) => {
    Product.find()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
}

exports.getProductById = (req, res, next) => {
    const _id = req.params._id;
    Product.findById(_id)
    .then(result => {
        if(!result){
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error;
          }
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}

exports.getProductBySubcategory= (req, res, next) => {
    const subcategory = req.params._id;
    Product.find({"subcategory" : `${subcategory}`})
    .then(result => {
        if(!result){
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error;
          }
        res.status(200).json({
            data:result
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}


//Cart




//Orders

exports.getOrdersById = (req, res, next) => {
    const _id = req.params._id;
    Order.findById(_id)
    .then(result => {
        if(!result){
            const error = new Error('Could not find');
            error.statusCode = 404;
            throw error;
        }
        res.status(200).json({
            data:result
        })
    })
}




//Customer


//Counting
  