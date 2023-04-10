/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe de métodos estáticos que manipulam os objetos do modelo sequelize 
 *          "Comunicacao"
 ************************************************************************************/
const db = require('../../models');

class Comunicacao {
    /**
     * @param integer esportista_id 
     * @param {*} dados 
     * @returns Comunicacao
     */
    static async criar(esportista_id, dados) {
        dados.esportista_id = Number(esportista_id);                       
        const comunicacao = await db.Comunicacao.create(dados);
        return comunicacao;
    }

    /**
     * @param integer esportista_id 
     * @param integer id 
     * @param {*} dados 
     * @returns Comunicacao | null
     */
    static async atualizar(esportista_id, id, dados) {
        let afetados = [];
        let criteria = {where: {id: Number(id), esportista_id: Number(esportista_id)}};
        await db.Comunicacao.update(dados, criteria).then(result=>{afetados = result;});
        if(afetados[0] == 1) {
            const comunicacao =  await db.Comunicacao.findOne(criteria);
            return comunicacao;
        } else {
            return null;
        }
    }
}

module.exports = Comunicacao;