const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const { checkoutStatus } = require("../const/enum");

const CheckoutSchema = new Schema({
  transactionId: {
    type: String,
    required: [true, "transactionId is required"]
  },
  header: {
    customer: {},
    merchant: {},
  },
  content: {
    items: [],
    total: {
      type: String,
      required: [true, "total is required"],
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
  status: {
    type: String,
    required: [true, "status is required"],
    enum: checkoutStatus,
  },
  deliveryFee: {
    type: Number,
    required: [true, "deliveryFee is required"],
  },
  estimatedDeliveryDateAndTime: {
    type: String,
    required: [true, "estimatedDeliveryDateAndTime is required"],
  },
});

module.exports = Checkout = mongoose.model("checkouts", CheckoutSchema);
