const Checkout = require("../../models/checkout");

const sales = async (req, res) => {
  const { accountId, start, end } = req.query;
  const endMonth = new Date(start);

  const parsedEndMonth = new Date(
    endMonth.getFullYear(),
    endMonth.getMonth() + 1,
    0
  );

  return Checkout.find({
    "header.merchant.accountId": accountId,
    status: "delivered",
    "date.createdAt": {
      $gte: start,
      $lt: end == undefined ? parsedEndMonth : end,
    },
  })
    .sort({ "date.createdAt": "asc" }) // filter by date
    .select({
      __v: 0,
      _id: 0,
      estimatedDeliveryDateAndTime: 0,
      status: 0,
    }) // Do not return _id and __v
    .then((value) => res.status(200).json(value))
    .catch((err) => res.status(400).json(err));
};

module.exports = {
  sales,
};
