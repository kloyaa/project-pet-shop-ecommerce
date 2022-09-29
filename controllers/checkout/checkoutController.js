const { v4: uuidv4 } = require("uuid");
const { Customer, Merchant } = require("../../models/profile");
const Checkout = require("../../models/checkout");
const Product = require("../../models/product");
const Monetization = require("../../models/monetization");

const MONETIZATION_PERCENT = 0.05;

const createCheckout = async (req, res) => {
  try {
    const {
      customerAccountId,
      merchantAccountId,
      products,
      deliveryFee,
      estimatedDeliveryDateAndTime,
      status
    } = req.body;

    const transactionId = uuidv4();


    let productsArray = [];
    let orderSubTotal = 0;

    const customer = await Customer
      .findOne({ accountId: customerAccountId })
      .select({ __v: 0, _id: 0 });

    const merchant = await Merchant
      .findOne({ accountId: merchantAccountId })
      .select({ __v: 0, _id: 0 });

    for (let value of products) {

      const product = await Product
        .findById(value._id)
        .select({ __v: 0, address: 0 });


      const quantity = value.qty;
      const subTotal = quantity * product.price;
      orderSubTotal += subTotal;
      productsArray.push({ ...product._doc, quantity, subTotal });
    }

    let payload = {
      transactionId,
      header: {
        customer,
        merchant,
      },
      content: {
        items: productsArray,
        total: orderSubTotal
      },
      deliveryFee,
      estimatedDeliveryDateAndTime,
      status
    }

    return new Checkout(payload)
      .save()
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));

  } catch (error) {
    console.error(error);
  }
};

const customerCheckouts = async (req, res) => {
  try {
    const { accountId, status } = req.query;

    return Checkout.find({ "header.customer.accountId": accountId, status })
      .sort({ "date.createdAt": "desc" }) // filter by date
      .select({ __v: 0 }) // Do not return _id and __v
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};

const getByTxnId = async (req, res) => {
  try {
    const transactionId = req.params.id;
    return Checkout.findOne({ transactionId })
      .select({ __v: 0 }) // Do not return _id and __v
      .then((value) => {
        if (!value) return res.status(400).json({ message: "Transaction not found" });
        return res.status(200).json(value);
      }).catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};

const merchantCheckouts = async (req, res) => {
  const { accountId, status } = req.query;
  return Checkout.find({ "header.merchant.accountId": accountId, status })
    .sort({ "date.createdAt": "asc" }) // filter by date
    .select({ __v: 0 }) // Do not return _id and __v
    .then((value) => res.status(200).json(value))
    .catch((err) => res.status(400).json(err));
};

const updateCheckoutStatus = async (req, res) => {
  const { transactionId, status } = req.body;
  try {
    const query = { transactionId };
    const update = { $set: { status, "date.updatedAt": Date.now() } };
    const options = { runValidators: true, new: true };
    let monetization;

    const { status } = await Checkout.findOne({ transactionId });

    if (status === "delivered")
      return res.status(400).json({ message: "Order not found" });

    const checkout = await Checkout.findOneAndUpdate(query, update, options);
    if (checkout === null) return res
      .status(400)
      .json({ message: "Order not found" });

    if (status === "delivered") {
      monetization = await Monetization({
        transactionId,
        amount: checkout.content.total * MONETIZATION_PERCENT,
      }).save();
    }

    return res.status(200).json({ checkout, monetization });
  } catch (error) {
    console.error(error);
  }
};

const deleteCheckout = async (req, res) => {
  try {
    const id = req.params.id;
    Checkout.findByIdAndDelete(id)
      .then((value) => {
        if (!value) return res.status(400).json({ message: "_id not found" });
        return res.status(200).json({ message: "_id deleted" });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  createCheckout,
  customerCheckouts,
  merchantCheckouts,
  getByTxnId,
  updateCheckoutStatus,
  deleteCheckout,
};
