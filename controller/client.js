const Category = require('../model/category');
const Subcategory = require('../model/subcategory');
const Product = require('../model/product');
const Customer = require('../model/customer');
const Order = require('../model/order');
const {validationResult} = require("express-validator");
const Cart = require('../model/cart');
const jwt = require('jsonwebtoken');
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


//signupend 5f1846bb2324d526045effa0

exports.loginCustomer = (req, res, next) => {
    const mobile = req.body.mobile;
    
    Customer.findOne({mobile:mobile})
    .then(user => {
        if(!user){
            const error = new Error('USER DOES NOT EXIST');
            error.statusCode = 401;
            throw error;
        }
        loaduser = user;
        return loaduser;
    })
    .then(loadeduser => {
        const token = jwt.sign({
            name:loaduser.name,
            mobile:loadeduser.mobile,
            userId:loadeduser._id.toString()
        }, 
        'dholpurkasecretwalasecret', 
        {expiresIn: '7 days'}
        );
        res.status(200).json({token:token,name:loadeduser.name, userId:loadeduser._id.toString()})
    })
    .catch(err => {
        if(!err.statusCode){
            err.statusCode = 500;
        }
        next(err);
    })
}

//Login user

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

exports.createCart = (req, res, next) => {
    const user = req.body.userid;
    const product = req.body.productid;
    
    Product.findById(product)
    .then(result => {
        console.log("Result : "+result)
        const sku = result.sku;
        const title = result.title;
        const imageurl = result.imageurl;
        const costprice = result.costprice;
        const sellingprice = result.sellingprice;

        const list = new Cart({
            userid:user,
            productid:product,
            sku:sku,
            title:title,
            imageurl:imageurl,
            costprice:costprice,
            sellingprice:sellingprice
        })

        list.save()
        .then(result => {
            res.status(200).json({
                message:"Added to Cart",
                data:result
            })
      })   
    
    })

    
    
}

exports.getCartProductByUserId = (req, res, next) => {
    const user  = req.params.userid;
    const productdata = [];
        Cart.find({"userid":`${user}`})
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


exports.deleteCartById = (req,res,next) => {
    const _id = req.params._id;
    Cart.findByIdAndRemove(_id)
    .then(result => {
        res.status(200).json({
            data:'Removed successfully'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}

//Orders
exports.createOrder = (req, res, next) => {
    const user  = req.body.userid;
    const referenceid = req.body.referenceid;
    const totalcost = req.body.totalcost;
    
    Customer.findById(user)
    .then(result => {
        const address = result.address + ' ' + result.city + ' ' + result.state + ' ' + result.pincode
        const mobile = result.mobile;
        Cart.find({"userid":`${result._id}`})
        .then(response => {
            const productid = response.map(list => {
                return list._id
            }).join(',');

            const sku = response.map(list => {
                return list.sku
            }).join(',');

            const titles = response.map(list => {
            return list.title
            }).join(',')

            const imageurls = response.map(list => {
                return list.imageurl
            }).join(',')


            // console.log({user, productid, referenceid, totalcost, sku, titles, imageurls, address, mobile});

            const list = new Order({
                userid:user,
                productid:productid,
                referenceid:referenceid,
                totalcost:totalcost,
                sku:sku,
                titles:titles,
                imageurls:imageurls,
                address:address,
                mobile:mobile
            })

            list.save()
            .then(result => {
                console.log(result);
                res.status(200).json({
                    message:'Order Successfully Placed',
                    data:result
                })
            })
        })
    })
   
}




exports.getOrdersByUserId = (req, res, next) => {
    const userid = req.params.userid;
    Order.find({"userid":`${userid}`})
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
  