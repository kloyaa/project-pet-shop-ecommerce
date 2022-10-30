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
    role: {
        type: String,
        required: [true, "role is required"],
        enum: ["customer", "driver", "shop"],
    },
    status: {
        type: String,
        enum: ["pending", "verified", "rejected"],
        default: "pending",
    },
});

module.exports = Verification = mongoose.model("verifications", VerificationSchema);