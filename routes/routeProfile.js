const express = require("express");
const router = express.Router();

const merchant = require("../controllers/profile/merchantProfileController");
const customer = require("../controllers/profile/customerProfileController");
const rider = require("../controllers/profile/riderProfileController");
const global = require("../controllers/profile/profileController");

const protected = require("../middleware/authentication");

// PROFILE
router.delete("/profile/g/:id", (req, res) => global.deleteProfile(req, res));

// MERCHANT PROFILE
router.post("/profile/merchant", (req, res) =>
  merchant.createProfile(req, res)
);
router.get("/profile/merchant", (req, res) =>
  merchant.getAllProfiles(req, res)
);
router.get("/profile/merchant/:id", (req, res) =>
  merchant.getProfile(req, res)
);
router.put("/profile/merchant", (req, res) => merchant.updateProfile(req, res));
router.put("/profile/merchant/address", (req, res) =>
  merchant.updateProfileAddress(req, res)
);
router.put("/profile/merchant/contact", (req, res) =>
  merchant.updateProfileContact(req, res)
);
router.put("/profile/merchant/avatar", (req, res) =>
  merchant.updateProfileAvatar(req, res)
);
router.put("/profile/merchant/visibility", (req, res) =>
  merchant.updateProfileVisibility(req, res)
);
router.put("/profile/merchant/delivery-fee", (req, res) =>
  merchant.updateDeliveryFee(req, res)
);
router.put("/profile/merchant/rider-status", (req, res) =>
  merchant.updateRiderStatus(req, res)
);
router.delete("/profile/merchant/:id", (req, res) =>
  merchant.deleteProfile(req, res)
);

// CUSTOMER PROFILE
router.post("/profile/customer", (req, res) =>
  customer.createProfile(req, res)
);
router.get("/profile/customer", (req, res) =>
  customer.getAllProfiles(req, res)
);
router.get("/profile/customer/:id", (req, res) =>
  customer.getProfile(req, res)
);
router.put("/profile/customer", (req, res) => customer.updateProfile(req, res));
router.put("/profile/customer/address", (req, res) =>
  customer.updateProfileAddress(req, res)
);
router.put("/profile/customer/contact", (req, res) =>
  customer.updateProfileContact(req, res)
);
router.put("/profile/customer/avatar", (req, res) =>
  customer.updateProfileAvatar(req, res)
);
router.put("/profile/customer/visibility", (req, res) =>
  customer.updateProfileVisibility(req, res)
);
router.delete("/profile/customer/:id", (req, res) =>
  customer.deleteProfile(req, res)
);

// RIDER PROFILE
router.post("/profile/rider", (req, res) => rider.createProfile(req, res));
router.get("/profile/rider", (req, res) => rider.getAllProfiles(req, res));
router.get("/profile/rider/:id", (req, res) => rider.getProfile(req, res));
router.put("/profile/rider", (req, res) => rider.updateProfile(req, res));
router.put("/profile/rider/address", (req, res) =>
  rider.updateProfileAddress(req, res)
);
router.put("/profile/rider/contact", (req, res) =>
  rider.updateProfileContact(req, res)
);
router.put("/profile/rider/avatar", (req, res) =>
  rider.updateProfileAvatar(req, res)
);
router.put("/profile/rider/visibility", (req, res) =>
  rider.updateProfileVisibility(req, res)
);
router.delete("/profile/rider/:id", (req, res) =>
  rider.deleteProfile(req, res)
);
module.exports = router;
