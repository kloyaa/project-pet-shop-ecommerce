const express = require("express");
const router = express.Router();

const cartController = require("../controllers/cart/cartController");

router.post("/cart", (req, res) => cartController.addToCart(req, res));
router.get("/cart/:id", (req, res) => cartController.getCart(req, res));
router.put("/cart", (req, res) => cartController.updateCart(req, res));
router.delete("/cart", (req, res) => cartController.deleteFromCart(req, res));
router.delete("/cart/:id", (req, res) => cartController.deleteCart(req, res));

module.exports = router;
