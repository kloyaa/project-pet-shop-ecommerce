const Product = require("../../models/product");
const cloudinary = require("../../services/img-upload/cloundinary");
const distanceBetween = require("../../helpers/distanceBetween");

const uploadProductImages = async (req, res) => {
  const filePath = req.file.path;
  const options = {
    folder:
      process.env.CLOUDINARY_FOLDER +
      `/merchant/products/${req.body.merchantName}`,
    unique_filename: true,
  };
  const uploadedImg = await cloudinary.uploader.upload(filePath, options);

  return res.status(200).json({ url: uploadedImg.url });
};

const createProduct = async (req, res) => {
  try {
    return new Product(req.body)
      .save()
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));
  } catch (error) {
    console.error(error);
  }
};

const getProducts = async (req, res) => {
  try {

    try {
      const { accountId, availability } = req.query;
      if (availability === undefined) return Product.find({ accountId })
        .sort({ _id: -1 })
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err));
      return Product.find({ accountId, availability })
        .sort({ _id: -1 })
        .then((value) => res.status(200).json(value))
        .catch((err) => res.status(400).json(err));
    } catch (err) {
      return res.status(400).json(err);
    }
  } catch (error) {
    console.error(error);
  }
};

const getAllProducts = async (req, res) => {
  try {
    const { keyword, latitude, longitude, sortBy } = req.query;
    if (latitude == undefined || longitude == undefined)
      return res.status(400).json({ message: "Invalid coordinates" })

    const isNotSearching = keyword == null || keyword === "" || keyword == undefined;
    const query = isNotSearching ? {} : { title: { $regex: keyword, $options: "i" } };

    return Product.find(query)
      .sort({ _id: -1 })
      .select({ __v: 0 })
      .then((value) => {
        const result = value
          .map((element, _) => {
            const fromLat = element.address.coordinates.latitude;
            const fromLon = element.address.coordinates.longitude;
            return {
              ...element._doc,
              distanceBetween: distanceBetween(fromLat, fromLon, latitude, longitude, "K").toFixed(1) + "km"
            };
          })
          .sort((a, b) => {
            const value1 = parseFloat(a.distanceBetween.replace(/[^\d.-]/g, ''));
            const value2 = parseFloat(b.distanceBetween.replace(/[^\d.-]/g, ''));
            if (sortBy == "desc") return value2 - value1;
            return value1 - value2;
          });
        return res.status(200).json(result);
      })
      .catch((err) => res.status(400).json(err));
  } catch (err) {
    return res.status(400).json(err);
  }
};

const deleteProduct = async (req, res) => {
  try {
    const id = req.params.id;
    Product.findByIdAndDelete(id)
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
  createProduct,
  uploadProductImages,
  getProducts,
  getAllProducts,
  deleteProduct,
};
