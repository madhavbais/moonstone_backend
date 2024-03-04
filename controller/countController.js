const Counts = require("../model/countsModel");

//retrieval counts from the database
const getCounts = async (req, res) => {
    try {

        const counts = await Counts.findOne(); //only one document(cultural)
        if (!counts) {
            return res.status(404).json({ message: 'Counts not found' });
        }

        // Response with the retrieved counts
        res.status(200).json(counts);
    } catch (error) {
        console.error('Error getting counts:', error);
        res.status(500).json({ message: 'Failed to get counts' });
    }
};


module.exports = { getCounts };
