
const express = require('express');

const {
    createCategory,getCategory,deleteCategoryById,
    createSubcategory,getSubcategory,deleteSubcategoryById,
    createProduct, getProduct, getProductById, updateProduct, deleteProductById,
    getOrders,updateOrder,
    getAllCustomer,
    getOrderById
} = require('../controller/admin');

const router = express.Router();

//Category
router.post('/category', createCategory);
router.get('/category', getCategory);
router.delete('/category/:_id', deleteCategoryById);

//Subcategory
router.post('/subcategory', createSubcategory);
router.get('/subcategory', getSubcategory);
router.delete('/subcategory/:_id', deleteSubcategoryById);

//Product
router.post('/product', createProduct);
router.get('/product', getProduct);
router.get('/product/:_id', getProductById);
router.put('/product', updateProduct);
router.delete('/product/:_id', deleteProductById);

//Order
router.get('/order', getOrders);
router.get('/order/:id', getOrderById);
router.put('/order', updateOrder);

router.get('/customer', getAllCustomer)

module.exports = router;