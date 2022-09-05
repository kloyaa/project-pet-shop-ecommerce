const Cart = require("../../models/cart");

const addToCart = async (req, res) => {
  try {
    const { accountId, item } = req.body;
    const cart = await Cart.findOne({ accountId });
    if (cart == null) {
      req.body.items = item;
      return new Cart(req.body)
        .save()
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err.errors));
    }
    const itemInArray = cart.items.find((el) => el._id == item._id) ?? false;
    if (itemInArray) {
      const update = {
        $set: {
          "items.$.qty": (itemInArray.qty += 1),
        },
      };
      const filter = { accountId, "items._id": item._id };
      return Cart.updateOne(filter, update, {
        new: true,
      })
        .then((value) => {
          if (!value) return res.status(400).json({ message: "_id not found" });
          return res.status(200).json(value);
        })
        .catch((err) => res.status(400).json(err));
    }

    return Cart.updateOne(
      { accountId },
      {
        $push: {
          items: item,
        },
      }
    )
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));
  } catch (error) {
    console.error(error);
  }
};

const getCart = async (req, res) => {
  try {
    const accountId = req.params.id;
    return Cart.findOne({ accountId })
      .select({ __v: 0 }) // Do not return _id and __v
      .then((value) => {
        value.items.reverse();
        res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};

const deleteFromCart = async (req, res) => {
  try {
    const { accountId, items } = req.body;
    return Cart.updateOne(
      { accountId },
      {
        $pull: {
          items: {
            _id: {
              $in: items,
            },
          },
        },
      },
      { new: true }
    )
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));
  } catch (error) {
    console.error(error);
  }
};

const deleteCart = async (req, res) => {
  try {
    const accountId = req.params.id;
    Cart.findOneAndRemove({ accountId })
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json({ message: "deleted" });
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.log(error);
  }
};

const updateCart = async (req, res) => {
  const { accountId, operation, _id } = req.body;

  const cart = await Cart.findOne({ accountId });
  const itemInArray = cart.items.find((el) => el._id == _id) ?? false;

  if (itemInArray) {
    const update = {
      $set: {
        "items.$.qty":
          operation === "decrement"
            ? (itemInArray.qty -= 1)
            : (itemInArray.qty += 1),
      },
    };
    const filter = { accountId, "items._id": _id };
    return Cart.findOneAndUpdate(filter, update, {
      new: true,
    })
      .then((value) => {
        if (!value) return res.status(400).json({ message: "_id not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  }
};

module.exports = {
  addToCart,
  getCart,
  updateCart,
  deleteFromCart,
  deleteCart,
};
