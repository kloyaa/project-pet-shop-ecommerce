require("dotenv").config();
const cloudinary = require("../../services/img-upload/cloundinary");
const Verification = require("../../models/ticket");
const { Customer, Merchant, Rider } = require("../../models/profile");


// POST
async function createVerificationTicket(req, res) {
    try {

        const hasPending = await Verification.findOne({ accountId: req.body.accountId });
        if (hasPending) {
            return res.status(400).send({ message: "accountId has pending ticket" });
        }
        const filePath = req.file.path;
        const options = {
            folder: process.env.CLOUDINARY_FOLDER + "/tickets/verification",
            unique_filename: true
        };
        const uploadedImg = await cloudinary.uploader.upload(filePath, options);

        req.body.img = uploadedImg.url;

        return new Verification(req.body)
            .save()
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).send(err.errors));
    } catch (error) {
        console.error(error);
    }
}

// GET
async function getAllVerificationTickets(req, res) {
    try {
        const { status } = req.query;
        if (status === "pending") {
            return Verification.find({ status })
                .sort({ 'date.createdAt': -1 }) // sort by date
                .select({ __v: 0 }) // Do not return _id and __v
                .then((value) => res.status(200).json(value))
                .catch((err) => res.status(400).json(err));
        }
        return Verification.find({ status })
            .sort({ 'date.createdAt': -1 }) // sort by date
            .select({ __v: 0 }) // Do not return _id and __v
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).json(err));
    } catch (error) {
        console.error(error);
    }
};

async function getSingleVerificationTicket(req, res) {
    try {
        const accountId = req.params.id;
        return Verification.findOne({ accountId })
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).json(err));
    } catch (error) {
        console.error(error);
    }
};

// UPDATE
async function updateProfileVerificationStatus(req, res) {
    try {
        const { _id, accountId, role, isVerified, ticketStatus } = req.body;
        const options = { new: true, runValidators: true };

        let profile;
        if (role === "customer") profile = await Customer.findOneAndUpdate({ accountId }, { verified: isVerified }, options);
        if (role === "merchant") profile = await Merchant.findOneAndUpdate({ accountId }, { verified: isVerified }, options);
        if (role === "rider") profile = await Rider.findOneAndUpdate({ accountId }, { verified: isVerified }, options);

        const verification = await Verification.findByIdAndUpdate(_id, { status: ticketStatus }, options);

        return res.status(200).json({ profile, verification });
    } catch (error) {
        console.error(error);
    }
};

// DELETE
async function deleteVerificationTicket(req, res) {
    try {
        const _id = req.params.id;
        Verification.findByIdAndDelete(_id)
            .then((value) => {
                if (value)
                    return res.status(200).json({ message: "deleted" });
                return res.status(200).json({ message: "_id doesn't exist or has already been deleted" });
            })
            .catch((err) => res.status(400).json(err));
    } catch (error) {
        console.log(error);
    }
};


module.exports = {
    createVerificationTicket,
    getAllVerificationTickets,
    getSingleVerificationTicket,
    updateProfileVerificationStatus,
    deleteVerificationTicket
};