const { Rider } = require("../../models/profile");
const cloudinary = require("../../services/img-upload/cloundinary");

const createProfile = async (req, res) => {
  try {
    const accountId = req.body.accountId;
    const doesExist = await Rider.findOne({ accountId });
    if (doesExist)
      return res.status(400).json({ message: "accountId already exist" });

    return new Rider(req.body)
      .save()
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err.errors));
  } catch (error) {
    console.error(error);
  }
};
const getAllProfiles = async (req, res) => {
  try {
    return Rider.find({})
      .sort({ createdAt: -1 }) // filter by date
      .select({ _id: 0, __v: 0 }) // Do not return _id and __v
      .then((value) => res.status(200).json(value))
      .catch((err) => res.status(400).json(err));
  } catch (error) {
    console.error(error);
  }
};
const getProfile = async (req, res) => {
  try {
    const accountId = req.params.id;
    Rider.findOne({ accountId })
      .select({ _id: 0, __v: 0 })
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
const updateProfile = async (req, res) => {
  try {
    const { accountId, firstName, lastName } = req.body;
    Rider.findOneAndUpdate(
      { accountId },
      {
        $set: {
          "name.first": firstName,
          "name.last": lastName,
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
    Rider.findOneAndUpdate({ accountId }, { visibility }, { new: true })
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
      folder: process.env.CLOUDINARY_FOLDER + "/rider/avatar",
      unique_filename: true,
    };
    const uploadedImg = await cloudinary.uploader.upload(filePath, options);

    Rider.findOneAndUpdate(
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
    Rider.findOneAndUpdate(
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
    Rider.findOneAndUpdate(
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

const deleteProfile = async (req, res) => {
  try {
    const accountId = req.params.id;
    Rider.findOneAndRemove({ accountId })
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
};
