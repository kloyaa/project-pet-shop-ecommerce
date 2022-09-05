const express = require("express");
const router = express.Router();

const product = require("../controllers/product/productController");

router.post("/product", (req, res) => product.createProduct(req, res));
router.post("/product/upload", (req, res) =>
  product.uploadProductImages(req, res)
);
router.get("/product", (req, res) => product.getProducts(req, res));
router.get("/product/all", (req, res) => product.getAllProducts(req, res));
router.delete("/product/:id", (req, res) => product.deleteProduct(req, res));

module.exports = router;
