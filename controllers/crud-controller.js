const db = require('../models');

/**
 * General Object handling
 */
class CRUDController {
    /**
     * Extract model name from a string url format
     * 
     * @param string url 
     * @returns string
     */
    static modelFromUrl(url) {
        const str = url.split('/')[1].replace(/[^a-zA-Z]+/g,'');
        const modelName = str.charAt(0).toUpperCase() + str.slice(1);
        return modelName;
    }

    /**
     * List all Model objects with no criteria
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Model[] | string
     */
    static async listAll(req, res) {
        const model = CRUDController.modelFromUrl(req.url);
        console.log(model);
        try {
            const all = await db[model].findAll();
            return res.status(200).json(all);
        } catch (error) {
            return res.status(500).json(error); 
        }
    }

    /**
     * Returns a single Model object
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Model | string
     */
    static async singleObject(req, res) {
        const { id } = req.params;
        const model = CRUDController.modelFromUrl(req.url);
        try {
            const one = await db[model].findOne({ 
                where: { id: Number(id) } 
            });
            return res.status(200).json(one);
        } catch (error) {
            return res.status(500).json(error); 
        }
    }    

    /**
     * Add a single Model object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Model | string
     */
    static async createObject(req, res) {
        const data = req.body;
        const model = CRUDController.modelFromUrl(req.url);
        try {
            const one = await db[model].create(data);
            return res.status(200).json(one);
        } catch (error) {
            return res.status(500).json(error);
        }
    }    

    /**
     * Update a single Model object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns Model | string
     */
    static async updateObject(req, res) {
        const { id } = req.params;
        const newData = req.body;
        const model = CRUDController.modelFromUrl(req.url);
        try {
            // update
            await db[model].update(newData, { 
                where: { 
                    id: Number(id) 
                } 
            });
            // search again
            const updatedOne = await db[model].findOne({ 
                where: { 
                    id: Number(id) 
                } 
            });            
            return res.status(200).json(updatedOne);
        } catch (error) {
            return res.status(500).json(error);
        }        
    }    

    /**
     * Delete a single Model object 
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns string
     */
    static async deleteObject(req, res) {
        const { id } = req.params;
        const model = CRUDController.modelFromUrl(req.url);
        try {
            await db[model].destroy({
                where: { 
                    id: Number(id) 
                }                 
            });
            return res.status(200).json({message:`${model} id ${id} deletado`});
        } catch (error) {
            return res.status(500).json(error);
        }
    }    
}

module.exports = CRUDController;