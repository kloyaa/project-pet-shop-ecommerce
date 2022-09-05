const { Customer, Merchant, Rider } = require("../../models/profile");

const deleteProfile = async (req, res) => {
  try {
    const accountId = req.params.id;

    Customer.findOneAndRemove({ accountId })
      .then((value) => console.log("Deleted Customer Profile", value))
      .catch((err) => cossole.log(err));
    
//     Merchant.findOneAndRemove({ accountId })
//       .then((value) => console.log("Merchant", value))
//       .catch((err) => cossole.log(err));
    
//     Rider.findOneAndRemove({ accountId })
//       .then((value) => console.log("Rider", value))
//       .catch((err) => cossole.log(err));
    
    return res.status(200).json({ message: "success" });
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  deleteProfile,
};
