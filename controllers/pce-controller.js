const db = require('../models');

class PCEController {

    static async PCEs(req, res) {
        try {
            const pces = await db.PCE.findAll();
            return res.status(200).json(pces);
        } catch (error) {
            return res.status(500).json(error.message); 
        }
    }

}

module.exports = PCEController;