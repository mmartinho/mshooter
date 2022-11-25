const db = require('../../models');

/**
 * Manipula o modelo que possui escopo de Esportista
 */
class DoEsportista {
    constructor(modelo) {
        this.modelo = modelo;
    }

    /**
     * @param Number esportista_id
     * @returns Modelo[]
     */
    async lista(esportista_id) {
        const all = await db[this.modelo].findAll({ where: { esportista_id } });
        return all;    
    } 

    /**
     * @param Number id 
     * @param Number esportista_id 
     * @returns Modelo
     */
    async item(id, esportista_id) {
        const one = await db[this.modelo].findOne({ where: { id, esportista_id } }); 
        return one;        
    }  
    
    /**
     * @param Number id 
     * @param Number esportista_id 
     * @param {*} dados
     * @returns Modelo
     */
    async atualizaItem(id, esportista_id, dados) {
        await db[this.modelo].update(dados, { where: { id, esportista_id } }); // atualiza
        const itemAtualizado = await db[this.modelo].findOne({where: {id, esportista_id}}); // busca denovo
        return itemAtualizado;
    }

    /**
     * @param Number esportista_id 
     * @param {*} dados 
     * @returns Modelo
     */
    async criaItem(esportista_id, dados) {   
        dados.esportista_id = esportista_id;
        const itemCriado = await db[this.modelo].create(dados);
        return itemCriado;
    }

    /**
     * @param Number id 
     * @param Number esportista_id 
     */
    async excluiItem(id, esportista_id) {
        await db[this.modelo].destroy({ where: { id, esportista_id } });        
    } 
}

module.exports = DoEsportista;