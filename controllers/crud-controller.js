const db = require('../models');
const resStatus = require('../shared/errors/res-status');

/**
 * General Object handling
 */
class CRUDController {
    constructor() {}
    
    /**
     * Extract model name from a string url format
     * Things like /something-another will be SomethingAnother
     * 
     * @param string url 
     * @returns string
     */
    static modelFromUrl(url) {
        var modelName = '';
        var nomes = [];
        var nome = '';
        /**
         * Separa os "/" em classes, resultando em:
         * ['','alguma-coisa', '', 'outra-coisa']
         */
        var classes = url.split('/');
        /** 
         * Pega apenas a segunda classe e separa cada nome 
         * entre "-" , resultando em: ['alguma', 'coisa']
         */
        nomes = classes[1].split('-'); 
        /**
         * Pra cada nome, considerando só os caracteres alfa,
         * concatena em uma unica string todos os nomes, deixando 
         * o primeiro caractere de cada nome maiusculo 
         */
        for(var i=0; i < nomes.length; i++){
            nome = nomes[i].replace(/[^a-zA-Z]+/g,''); // considera só o alfa de cada nome
            if(nome) { modelName += nome.charAt(0).toUpperCase() + nome.slice(1); }
        }  
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
        const params = req.params;
        const model = CRUDController.modelFromUrl(req.url);
        var all = [];
        var total = 0;
        try {
            if('offset' in params && 'limit' in params && params['limit'] && params['offset']) {
                await db[model].findAndCountAll({limit: Number(params.limit), offset: Number(params.offset)}).then((result)=> {
                    all = result.rows;
                    total = result.count;
                });
                return res.status(200).json({ model, total, rows : all});
            } else {
                all = await db[model].findAll();
                return res.status(200).json(all);
            }
        } catch (error) {
            return resStatus(error, res);
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
            const one = await db[model].findOne({ where: { id: Number(id) } });
            if(!one) {
                return res.status(404).json({message: `${model} de ID ${id} não encontrado`});
            } 
            return res.status(200).json(one);
        } catch (error) {
            return resStatus(error, res);
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
            return resStatus(error, res);
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
            await db[model].update(newData, {where: {id: Number(id)}});
            // search again
            const updatedOne = await db[model].findOne({where: {id : Number(id)}});
            if(!updatedOne) {           
                return res.status(404).json({message: `${model} de ID ${id} não encontrado`});
            } 
            return res.status(200).json(updatedOne);
        } catch (error) {
            return resStatus(error, res);
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
        var affected=0;
        try {
            await db[model].destroy({where:{id: Number(id)}}).then(result => {affected = result});
            if(affected == 0) {
                return res.status(404).json({message:`${model} id ${id} não encontrado(a)`});
            } 
            return res.status(200).json({message:`${model} id ${id} deletado(a)`});
        } catch (error) {
            return resStatus(error, res);
        }
    }    
}

module.exports = CRUDController;