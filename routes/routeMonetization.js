const express = require("express");
const router = express.Router();

const monetization = require("../controllers/monetization/txnMonetizationController");

router.post("/monetization/txn", (req, res) => monetization.create(req, res));
router.get("/monetization/txn", (req, res) => monetization.getAll(req, res));
router.get("/monetization/txn/:id", (req, res) => monetization.getByTxnId(req, res));

module.exports = router;
