const Category = require('../model/category');
const Subcategory = require('../model/subcategory');
const Product = require('../model/product');
const Customer = require('../model/customer');
const Order = require('../model/order');


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





//Blog
exports.getSubcategoryByCategory = (req, res, next) => {
    const category = req.body.category;
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
    const subcategory = req.params.subcategory;
    Product.findById({"subcategory" : `${subcategory}`})
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
  