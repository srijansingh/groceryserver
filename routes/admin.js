const express = require("express");

const {
  createCategory,
  getCategory,
  deleteCategoryById,
  createSubcategory,
  getSubcategory,
  deleteSubcategoryById,
  createProduct,
  getProduct,
  getProductById,
  updateProduct,
  deleteProductById,
  getProductByCategoryId,
  getProductBySubcategoryId,
  getOrders,
  updateOrder,
  getAllCustomer,
  getOrderById,
  updateProductStatus,
  getSubcategoryByCategoryid,
  getProcessingOrder,
  getDeliveredOrder,
  getShippedOrder,
  createBrand,
  getBrand,
  deleteBrandById,
} = require("../controller/admin");

const router = express.Router();

//Category
router.post("/category", createCategory);
router.get("/category", getCategory);
router.delete("/category/:_id", deleteCategoryById);
router.get("/category/product/:_id", getProductByCategoryId);
router.get("/category/subcategory/:_id", getSubcategoryByCategoryid);

//Subcategory
router.post("/subcategory", createSubcategory);
router.get("/subcategory", getSubcategory);
router.delete("/subcategory/:_id", deleteSubcategoryById);
router.get("/subcategory/product/:_id", getProductBySubcategoryId);

//Product
router.post("/product", createProduct);
router.get("/product", getProduct);
router.get("/product/:_id", getProductById);
router.put("/product", updateProduct);
router.put("/status", updateProductStatus);

router.delete("/product/:_id", deleteProductById);

//Order
router.get("/order", getOrders);
router.get("/order/:id", getOrderById);
router.put("/order", updateOrder);
router.get("/processing", getProcessingOrder);
router.get("/delivered", getDeliveredOrder);
router.get("/shipped", getShippedOrder);

//Brand
router.post("/brand", createBrand);
router.get("/brand", getBrand);
router.delete("/brand/:_id", deleteBrandById);

router.get("/customer", getAllCustomer);

module.exports = router;
