const db = require('../../models');
const DoEsportista = require('./do-esportista');

class Local extends DoEsportista {
    /**
     * @param integer esportista_id 
     * @param integer tipo 
     * @param string nome 
     * @param string cnpj 
     * @param integer limit 
     * @param integer offset 
     * @returns []
     */
    async listaPorCampos(esportista_id, tipo=null, nome=null, cnpj=null, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: {esportista_id: Number(esportista_id)} 
        } 
        if(tipo) {criteria.where.tipo = tipo;} 
        if(nome) {criteria.where.nome = nome;} 
        if(cnpj) {criteria.where.cnpj = cnpj;}
        if(limit === null || offset === null) {
            all = await db[this.modelo].findAll(criteria);
            return all;
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db[this.modelo].findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:this.modelo, total, rows : all};            
        }        
    }
}

const localDoEsportista = new Local('Local');

module.exports = localDoEsportista;