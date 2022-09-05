const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const VerificationSchema = new Schema({
    accountId: {
        type: String,
        required: [true, "accountId is required"],
    },
    img: {
        type: String,
        required: [true, "img is required"],
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
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        required: [true, "status is required"],
    },
});

module.exports = Verification = mongoose.model("verifications", VerificationSchema);