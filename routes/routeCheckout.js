const express = require("express");
const router = express.Router();

const checkout = require("../controllers/checkout/checkoutController");

router.post("/checkout", (req, res) => checkout.createCheckout(req, res));
router.get("/checkout/get-by-customers", (req, res) =>
  checkout.getCheckouts(req, res)
);
router.get("/checkout/txn/:id", (req, res) =>
  checkout.getByTxnId(req, res)
);
router.get("/checkout/get-by-merchants", (req, res) =>
  checkout.merchantCheckouts(req, res)
);
router.put("/checkout", (req, res) => checkout.updateCheckoutStatus(req, res));
router.delete("/checkout/:id", (req, res) => checkout.deleteCheckout(req, res));

module.exports = router;
