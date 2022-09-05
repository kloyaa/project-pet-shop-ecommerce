const { Merchant } = require("../../models/profile");
const distanceBetween = require("../../helpers/distanceBetween");
const cloudinary = require("../../services/img-upload/cloundinary");

const createProfile = async (req, res) => {
  try {
    const accountId = req.body.accountId;
    const doesExist = await Merchant.findOne({ accountId });
    if (doesExist)
      return res.status(400).json({ message: "accountId already exist" });

    return new Merchant(req.body)
      .save()
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));
  } catch (error) {
    console.error(error);
  }
};
const getAllProfiles = async (req, res) => {
  try {
    const { latitude, longitude, sortBy } = req.query;

    if (latitude == undefined || longitude == undefined)
      return res.status(400).json({ message: "exact coordinates is required" });

    return Merchant.find({})
      .sort({ createdAt: -1 }) // filter by date
      .select({ _id: 0, __v: 0 }) // Do not return _id and __v
      .then((value) => {
        const result = value
          .map((element, _) => {
            const start = element.address.coordinates.latitude;
            const end = element.address.coordinates.longitude;
            const data = {
              ...element._doc,
              distanceBetween: distanceBetween(
                start,
                end,
                latitude,
                longitude,
                "K"
              ).toFixed(1),
            };
            return data;
          })
          .sort((a, b) => {
            const value1 = parseFloat(a.distanceBetween);
            const value2 = parseFloat(b.distanceBetween);
            if (sortBy == "desc") return value2 - value1;
            return value1 - value2;
          });

        return res.status(200).json(result);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};
const getProfile = async (req, res) => {
  try {
    const accountId = req.params.id;
    Merchant.findOne({ accountId })
      .select({ _id: 0, __v: 0 })
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "merchant accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};
const updateProfile = async (req, res) => {
  try {
    const { accountId, name } = req.body;
    Merchant.findOneAndUpdate(
      { accountId },
      {
        $set: {
          name: name,
          "date.updatedAt": Date.now(),
        },
      },
      { new: true }
    )
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};
const updateProfileVisibility = async (req, res) => {
  try {
    const { accountId, visibility } = req.query;
    Merchant.findOneAndUpdate({ accountId }, { visibility }, { new: true })
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};
const updateProfileAvatar = async (req, res) => {
  try {
    const accountId = req.body.accountId;
    const filePath = req.file.path;
    const options = {
      folder: process.env.CLOUDINARY_FOLDER + "/merchant/avatar",
      unique_filename: true,
    };
    const uploadedImg = await cloudinary.uploader.upload(filePath, options);

    Merchant.findOneAndUpdate(
      { accountId },
      {
        $set: {
          avatar: uploadedImg.url,
          "date.updatedAt": Date.now(),
        },
      },
      { new: true }
    )
      .then((value) => {
        if (!value) return res.status(400).json({ message: "_id not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.log(error);
  }
};
const updateProfileAddress = async (req, res) => {
  try {
    const { accountId, name, latitude, longitude } = req.body;
    Merchant.findOneAndUpdate(
      { accountId },
      {
        $set: {
          "address.name": name,
          "address.coordinates.latitude": latitude,
          "address.coordinates.longitude": longitude,
          "date.updatedAt": Date.now(),
        },
      },
      { new: true }
    )
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const updateProfileContact = async (req, res) => {
  try {
    const { accountId, email, number } = req.body;
    Merchant.findOneAndUpdate(
      { accountId },
      {
        $set: {
          "contact.email": email,
          "contact.number": number,
          "date.updatedAt": Date.now(),
        },
      },
      { new: true }
    )
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const updateDeliveryFee = async (req, res) => {
  try {
    const { accountId, feePerKilometer } = req.body;
    Merchant.findOneAndUpdate(
      { accountId },
      {
        feePerKilometer,
      },
      { new: true }
    )
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const updateRiderStatus = async (req, res) => {
  try {
    const { accountId, riderStatus } = req.body;
    Merchant.findOneAndUpdate(
      { accountId },
      {
        riderStatus,
      },
      { runValidators: true, new: true }
    )
      .then((value) => {
        if (!value)
          return res.status(400).json({ message: "accountId not found" });
        return res.status(200).json(value);
      })
      .catch((err) => res.status(400).json(err));
  } catch (e) {
    return res.status(400).json({ message: "Something went wrong" });
  }
};
const deleteProfile = async (req, res) => {
  try {
    const accountId = req.params.id;
    Merchant.findOneAndRemove({ accountId })
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

module.exports = {
  createProfile,
  getAllProfiles,
  getProfile,
  updateProfile,
  deleteProfile,
  updateProfileAvatar,
  updateProfileContact,
  updateProfileAddress,
  updateProfileVisibility,
  updateDeliveryFee,
  updateRiderStatus,
};
