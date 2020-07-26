const Category = require('../model/category');
const Subcategory = require('../model/subcategory');
const Product = require('../model/product');
const Customer = require('../model/customer');
const Order = require('../model/order');

exports.createCategory = (req, res, next) => {
    const category = req.body.category;
    const imageurl = req.body.imageurl;

    const list = new Category({
        category:category,
        imageurl:imageurl
    })

    list.save()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
}

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


exports.deleteCategoryById = (req,res,next) => {
    const _id = req.params._id;
    Category.findByIdAndRemove(_id)
    .then(result => {
        res.status(200).json({
            data:'Deleted successfully'
        })
    })
    .catch(err => {
        console.log(err);
        res.json({
            error:err
        })
    })
}


//Subcategory

exports.createSubcategory = (req, res, next) => {
    const subcategory = req.body.subcategory;
    const categoryid = req.body.categoryid;
    const imageurl = req.body.imageurl;
    let cat;
    const list = new Subcategory({
        subcategory:subcategory,
        category:categoryid,
        imageurl:imageurl
    })

    list.save()
    .then(res => {
        return Category.findById(categoryid);
    })
    .then(category => {
        category.subcategory.push(list);
        return category.save();
    })
    .then(result => {
        res.status(200).json({
            message:"Subcategory Added",
            data:result,
            category:cat
        })
    })
}
 
exports.getSubcategory = (req, res, next) => {
    Subcategory.find()
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


exports.deleteSubcategoryById = (req,res,next) => {
    const _id = req.params._id;
    Subcategory.findByIdAndRemove(_id)
    .then(result => {
        res.status(200).json({
            data:'Deleted successfully'
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


exports.createProduct = (req, res, next) => {
    const sku = req.body.sku;
    const title = req.body.title;
    const imageurl = req.body.imageurl;
    const description = req.body.description;
    const category = req.body.categoryid;
    const subcategory = req.body.subcategoryid;
    const costprice = req.body.costprice;
    const sellingprice = req.body.sellingprice;
    const discount = (costprice - sellingprice) / 100;


    const list = new Product({
        sku:sku,
        title:title,
        imageurl:imageurl,
        description:description,
        category:category,
        subcategory:subcategory,
        costprice:costprice,
        sellingprice:sellingprice,
        discount:discount
    })

    list.save()
    .then(res => {
        Category.findById(req.body.categoryid)
        .then(category => {
            category.products.push(list);
           category.save();
        });

        Subcategory.findById(req.body.subcategoryid)
        .then(subcategory => {
            subcategory.products.push(list);
            subcategory.save();
        });
    })
    .then(result => {
        res.status(200).json({
            message : "Product Added",
            data:list
        })
    })
}

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
        res.status(200).json({
            data:result
        })
    })
}

exports.updateProduct = (req, res, next) => {
    const _id = req.body.id;
    const title = req.body.title;
    const costprice = req.body.costprice;
    const sellingprice = req.body.sellingprice;
    const description = req.body.description;
    Product.findById(_id)
    .then(result => {
      if(!result){
        const error = new Error('Could not find');
        error.statusCode = 404;
        throw error;
      }
      result.title = title;
      result.costprice = costprice;
      result.sellingprice = sellingprice;
      result.description = description;

      return result.save();
    })
    .then(result => {
      res.status(200).json({
        message : 'Successfully updated',
        data : result
      })
    })
    .catch(err => {
      console.log(err)
    })
}


exports.deleteProductById = (req,res,next) => {
    const _id = req.params._id;
    Product.findByIdAndRemove(_id)
    .then(result => {
        res.status(200).json({
            data:'Deleted successfully'
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

exports.getOrders = (req, res, next) => {
    Order.find()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
}

exports.updateOrder = (req,res,next) => {
    const id = req.body.id;
    const status = req.body.status;
    Order.findById(id)
    .then(result => {
      if(!result){
        const error = new Error('Could not find');
        error.statusCode = 404;
        throw error;
      }
      result.status = status
      return result.save();
    })
    .then(result => {
      res.status(200).json({
        message : 'Successfully updated',
        data : result
      })
    })
    .catch(err => {
      console.log(err)
    })
  }


//Customer
exports.getAllCustomer = (req, res, next) => {
    Customer.find()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
}

//Counting
  