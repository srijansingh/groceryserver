const Gallery = require('../model/gallery');
const Blog = require('../model/blog');
const Customer = require('../model/customer');

//Blog
exports.getBlog = (req, res, next) => {
    Blog.find()
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

exports.getBlogCategory = (req, res, next) => {
    Blog.distinct("category")
    .then(result => {
        console.log(result);
        res.status(200).json({
            category : result
        })
    })
}


exports.getBlogByCategory = (req, res, next) => {
    const category = req.params.category;
    Blog.find({"category":`${category}`})
    .then(result => {
    console.log(result)
    res.status(200).json({
      data : result
    });
  })
  .catch(err => {
    console.log(err)
  })
}

//Gallery

exports.getGallery = (req, res, next) => {
    Gallery.find()
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


exports.getGalleryCategory = (req, res, next) => {
    Gallery.distinct("category")
    .then(result => {
        console.log(result);
        res.status(200).json({
            category : result
        })
    })
}

exports.getGalleryByCategory = (req, res, next) => {
    const category = req.params.category;
    Gallery.find({"category":`${category}`})
    .then(result => {
    console.log(result)
    res.status(200).json({
      data : result
    });
  })
  .catch(err => {
    console.log(err)
  })
}



//Customer

exports.insertCustomer = (req, res, next) => {
    const name = req.body.name;
    const email = req.body.email;
    const phonenum = req.body.phonenum;
    const message = req.body.message;

    const list = new Customer({
        name:name,
        email:email,
        phonenum:phonenum,
        message:message
    })

    list.save()
    .then(result => {
        res.status(200).json({
            data:result
        })
    })
}