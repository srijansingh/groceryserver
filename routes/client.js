const express = require('express');
const {
    getBlog,getBlogCategory,getBlogByCategory,
    getGallery, getGalleryCategory, getGalleryByCategory,
    insertCustomer
} = require('../controller/client');

const router = express.Router();

//Gallery 
router.get('/gallery', getGallery);
router.get('/category/gallery', getGalleryCategory);
router.get('/category/gallery/:category', getGalleryByCategory);

//blog
router.get('blog', getBlog);
router.get('/category/blog', getBlogCategory);
router.get('/category/blog/:category', getBlogByCategory);
 

//Customer
router.post('/customer', insertCustomer);


module.exports = router;