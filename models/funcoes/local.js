const db = require('../../models');
const DoEsportista = require('./do-esportista');

class Local extends DoEsportista {
    
    /**
     * @param Number id 
     * @param Number esportista_id 
     * @returns MunicaoUtilizada[]
     */
    async listaHabitualidades(id, esportista_id) {
        const all = await db.MunicaoUtilizada.findAll({ where: { local_id: id, esportista_id } });
        return all; 
    }

    /**
     * @param Number id 
     * @param Number esportista_id 
     * @returns MunicaoUtilizada
     */
     async mostraHabitualidade(id, habitualidade_id, esportista_id) {
        const one = await db.MunicaoUtilizada.findOne({ where: { id: habitualidade_id, local_id: id, esportista_id } });
        return one; 
    }    

    /**
     * @param Number id 
     * @param Number esportista_id 
     * @param {*} dados 
     * @returns MunicaoUtilizada
     */
    async criaHabitualidade(id, esportista_id, dados) {
        dados.esportista_id = esportista_id;
        dados.local_id = id;
        const habitualidadeCriada = await db.MunicaoUtilizada.create(dados);
        return habitualidadeCriada;
    }

    /**
     * @param Number id 
     * @param Number habitualidade_id 
     * @param Number esportista_id 
     * @param {*} dados 
     * @returns MunicaoUtilizada
     */
    async atualizaHabitualidade(id, habitualidade_id, esportista_id, dados) {
        await db.MunicaoUtilizada.update(dados, { where: { id: habitualidade_id, esportista_id, local_id: id } }); // atualiza
        const habitualidadeAtualizada = await db.MunicaoUtilizada.findOne({where: {id: habitualidade_id, esportista_id, local_id: id }}); // busca denovo
        return habitualidadeAtualizada;        
    }

    /**
     * @param Number id 
     * @param Number habitualidade_id 
     * @param Number esportista_id 
     */
    async excluiHabitualidade(id, habitualidade_id, esportista_id) {
        await db.MunicaoUtilizada.destroy({ where: { id: habitualidade_id, esportista_id, local_id: id } });        
    }
}

const localDoEsportista = new Local('Local');

module.exports = localDoEsportista;