const { v4: uuidv4 } = require("uuid")
const TxnMonetization = require("../../models/monetization");

const create = async (req, res) => {
    try {
        req.body.transactionId = uuidv4();
        return new TxnMonetization(req.body)
            .save()
            .then((value) => res.status(200).json(value))
            .catch((err) => res.status(400).json(err));
    } catch (error) {
        console.error(error);
    }
};

const getAll = async (req, res) => {
    try {
        return TxnMonetization.find({})
            .sort({ "createdAt": "desc" }) // filter by date
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
        return TxnMonetization.findOne({ transactionId })
            .sort({ "reatedAt": "desc" }) // filter by date
            .select({ __v: 0 }) // Do not return _id and __v
            .then((value) => {
                if (!value) return res.status(400).json({ message: "Transaction not found" });
                return res.status(200).json(value);
            })
            .catch((err) => res.status(400).json(err));
    } catch (error) {
        console.error(error);
    }
};

module.exports = { create, getAll, getByTxnId }