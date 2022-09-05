const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const { riderStatus } = require("../const/enum");

const CustomerProfileSchema = new Schema({
  accountId: {
    type: String,
    required: [true, "accountId is required"],
  },
  role: {
    type: String,
    default: "customer",
  },
  name: {
    first: {
      type: String,
      required: [true, "firstName is required"],
    },
    last: {
      type: String,
      required: [true, "lastName is required"],
    },
  },
  address: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    coordinates: {
      latitude: {
        type: String,
        required: [true, "latitude is required"],
      },
      longitude: {
        type: String,
        required: [true, "longitude is required"],
      },
    },
  },
  contact: {
    email: {
      type: String,
      // required: [true, "email is required"],
    },
    number: {
      type: String,
      //required: [true, "contactNo is required"],
    },
  },
  avatar: { type: String },
  date: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  visibility: {
    type: Boolean,
    required: [true, "visibility is required"],
  },
  verified: {
    type: Boolean,
    required: [true, "verified status is required"],
  },
});

const MerchantProfileSchema = new Schema({
  accountId: {
    type: String,
    required: [true, "accountId is required"],
  },
  role: {
    type: String,
    default: "merchant",
  },
  avatar: { type: String },
  banner: { type: String },
  name: { type: String },
  address: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    coordinates: {
      latitude: {
        type: String,
        required: [true, "latitude is required"],
      },
      longitude: {
        type: String,
        required: [true, "longitude is required"],
      },
    },
  },
  contact: {
    email: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  date: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  visibility: {
    type: Boolean,
    required: [true, "visibility is required"],
  },
  verified: {
    type: Boolean,
    required: [true, "verification status is required"],
  },

  serviceHrs: { type: String },

  riderStatus: {
    type: String,
    enum: riderStatus,
    required: [true, "riderStatus is required"],
  },
  // OPTIONAL
  feePerKilometer: { type: String },
});

const RiderProfileSchema = new Schema({
  accountId: {
    type: String,
    required: [true, "accountId is required"],
  },
  role: {
    type: String,
    default: "rider",
  },
  avatar: { type: String },
  name: {
    first: {
      type: String,
    },
    last: {
      type: String,
    },
  },
  address: {
    name: {
      type: String,
      required: [true, "name is required"],
    },
    coordinates: {
      latitude: {
        type: String,
        required: [true, "latitude is required"],
      },
      longitude: {
        type: String,
        required: [true, "longitude is required"],
      },
    },
  },
  contact: {
    email: {
      type: String,
    },
    number: {
      type: String,
    },
  },
  date: {
    createdAt: {
      type: Date,
      default: Date.now,
    },
    updatedAt: {
      type: Date,
    },
  },
  visibility: {
    type: Boolean,
    required: [true, "visibility is required"],
  },
  verified: {
    type: Boolean,
    required: [true, "verification status is required"],
  },
});

module.exports = {
  Merchant: mongoose.model("merchant-profiles", MerchantProfileSchema),
  Customer: mongoose.model("customer-profiles", CustomerProfileSchema),
  Rider: mongoose.model("rider-profiles", RiderProfileSchema),
};
