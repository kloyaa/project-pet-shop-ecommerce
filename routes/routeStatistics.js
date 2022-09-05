const express = require("express");
const router = express.Router();

const merchant = require("../controllers/statistics/merchantStatistics");
const customer = require("../controllers/statistics/customerStatistics");

// MERCHANT
router.get("/statistics/merchant/sales", (req, res) =>
  merchant.sales(req, res)
);

// CUSTOMER
router.get("/statistics/customer/expenses", (req, res) =>
  customer.expenses(req, res)
);

module.exports = router;
