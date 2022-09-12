const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const ProductSchema = new Schema({
  accountId: {
    type: String,
    required: [true, "accountId is required"],
  },
  title: {
    type: String,
    required: [true, "title is required"],
  },
  description: {
    type: String,
    required: [true, "description is required"],
  },
  images: [],
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
  price: {
    type: Number,
    required: [true, "price is required"],
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
  availability: {
    type: Boolean,
    required: [true, "availability is required"],
  },
});

module.exports = Product = mongoose.model("products", ProductSchema);
