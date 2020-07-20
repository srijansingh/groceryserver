
const express = require('express');
const {
    insertGallery,getGallery,deleteGalleryById,
    insertBlog,getBlog,getBlogById,deleteBlogById,
    insertCustomer,getAllCustomer
} = require('../controller/admin');

const router = express.Router();

//Gallery 
router.post('/gallery', insertGallery);
router.get('/gallery', getGallery);
router.delete('/gallery/:_id', deleteGalleryById);


//blog
router.post('/blog', insertBlog);
router.get('/blog', getBlog);
router.get('/blog/:_id', getBlogById);
router.delete('/blog/:_id', deleteBlogById);

//Customer
router.post('/customer', insertCustomer);
router.get('/customer', getAllCustomer)

module.exports = router;