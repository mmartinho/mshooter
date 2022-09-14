const db = require('../models');

/**
 * PCEs handling
 */
class PCEController {

    /**
     * List all PCEs with no criteria
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns PCE[] | string
     */
    static async PCEs(req, res) {
        try {
            const pces = await db.PCE.findAll();
            return res.status(200).json(pces);
        } catch (error) {
            return res.status(500).json(error); 
        }
    }

    /**
     * Returns a single PCE object
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns PCE | string
     */
    static async PCE(req, res) {
        const { id } = req.params;
        try {
            const pce = await db.PCE.findOne({ 
                where: { id: Number(id) } 
            });
            return res.status(200).json(pce);
        } catch (error) {
            return res.status(500).json(error); 
        }
    }    

    /**
     * Add a single PCE object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns PCE | string
     */
    static async criaPCE(req, res) {
        const PCEdata = req.body;
        try {
            const pce = await db.PCE.create(PCEdata);
            return res.status(200).json(pce);
        } catch (error) {
            return res.status(500).json(error);
        }
    }    

    /**
     * Update a single PCE object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns PCE | string
     */
    static async atualizaPCE(req, res) {
        const { id } = req.params;
        const PCEnewData = req.body;
        try {
            // update
            await db.PCE.update(PCEnewData, { 
                where: { 
                    id: Number(id) 
                } 
            });
            // search again
            const updatedPCE = await db.PCE.findOne({ 
                where: { 
                    id: Number(id) 
                } 
            });            
            return res.status(200).json(updatedPCE);
        } catch (error) {
            return res.status(500).json(error);
        }        
    }    

    /**
     * Delete a single PCE object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async apagaPCE(req, res) {
        const { id } = req.params;
        try {
            await db.PCE.destroy({
                where: { 
                    id: Number(id) 
                }                 
            });
            return res.status(200).json({message:`PCE id ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error);
        }
    }    
}

module.exports = PCEController;