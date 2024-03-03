const Utr = require("../model/utr");

// Create a new UTR
const createUtr = async (req, res) => {
    try {
        const { utr, reg_id } = req.body;
        const newUtr = new Utr({ utr, reg_id });
        await newUtr.save();
        res.status(201).json({ message: 'UTR created successfully', utr: newUtr });
    } catch (error){
        console.error('Error in creating UTR:', error);
        res.status(500).json({ message: 'Failed to create UTR' });
    }
};

// Get all UTRs
const getAllUtrs = async (req, res) => {
    try {
        const utrs = await Utr.find();
        res.status(200).json(utrs);
    } catch (error) {
        console.error('Error getting UTRs:', error);
        res.status(500).json({ message: 'Failed to get UTRs' });
    }
};

module.exports = { createUtr, getAllUtrs };

