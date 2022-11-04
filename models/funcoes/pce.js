const db = require('../../models');

class Pce {
    /**
     * @param Number esportista_id
     * @returns Pce[]
     */
    static async listaDoEsportista(esportista_id) {
        const all = await db.Pce.findAll({ where: { esportista_id } });
        return all;    
    } 
    
    /**
     * @param Number id 
     * @param Number esportista_id 
     * @returns Pce
     */
    static async itemDoEsportista(id, esportista_id) {
        const one = await db.Pce.findOne({ where: { id, esportista_id } }); 
        return one;        
    }

    /**
     * @param Number id 
     * @param Number esportista_id 
     * @param Object 
     * @returns Pce
     */
    static async atualizaItemDoEsportista(id, esportista_id, dados) {
        await db.Pce.update(dados, { where: { id, esportista_id } }); // atualiza
        const itemAtualizado = await db.Pce.findOne({where: {id, esportista_id}}); // busca denovo
        return itemAtualizado;
    }

    /**
     * @param Number esportista_id 
     * @param Object 
     * @returns Pce
     */
    static async criaItemDoEsportista(esportista_id, dados) {   
        dados.esportista_id = esportista_id;
        const itemCriado = await db.Pce.create(dados);
        return itemCriado;
    }

    /**
     * @param Number id 
     * @param Number esportista_id 
     */
    static async excluiItemDoEsportista(id, esportista_id) {
        await db.Pce.destroy({ where: { id, esportista_id } });        
    }
}

module.exports = Pce