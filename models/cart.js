const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const CartSchema = new Schema({
  accountId: {
    type: String,
    required: [true, "accountId is required"],
  },
  items: [],
});

module.exports = Cart = mongoose.model("carts", CartSchema);
