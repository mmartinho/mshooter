const db = require('../../models');

class Local {
    /**
     * @param Number esportista_id
     * @returns Local[]
     */
    static async listaDoEsportista(esportista_id) {
        const all = await db.Local.findAll({ where: { esportista_id } });
        return all;    
    } 

    /**
     * @param Number id 
     * @param Number esportista_id 
     * @returns Local
     */
     static async itemDoEsportista(id, esportista_id) {
        const one = await db.Local.findOne({ where: { id, esportista_id } }); 
        return one;        
    }  
    
    /**
     * @param Number id 
     * @param Number esportista_id 
     * @param Object 
     * @returns Local
     */
     static async atualizaItemDoEsportista(id, esportista_id, dados) {
        await db.Local.update(dados, { where: { id, esportista_id } }); // atualiza
        const itemAtualizado = await db.Local.findOne({where: {id, esportista_id}}); // busca denovo
        return itemAtualizado;
    }

    /**
     * @param Number esportista_id 
     * @param Object dados 
     * @returns 
     */
    static async criaItemDoEsportista(esportista_id, dados) {   
        dados.esportista_id = esportista_id;
        const itemCriado = await db.Local.create(dados);
        return itemCriado;
    }

    /**
     * @param Number id 
     * @param Number esportista_id 
     */
    static async excluiItemDoEsportista(id, esportista_id) {
        await db.Local.destroy({ where: { id, esportista_id } });        
    }    
}

module.exports = Local;