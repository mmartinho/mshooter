/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe instanciável que manipula os objetos de modelo sequelize passado 
 *          no método construtor desta   
 ************************************************************************************/
const db = require('../../models');

/**
 * Manipula o modelo que possui escopo de Esportista
 */
class DoEsportista {
    constructor(modelo) {
        this.modelo = modelo;
    }

    /**
     * @param integer esportista_id
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @returns {*}
     */
    async lista(esportista_id, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: {esportista_id: Number(esportista_id)} 
        }     
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

    /**
     * @param integer id 
     * @param integer esportista_id 
     * @returns Modelo
     */
    async item(id, esportista_id) {
        const criteria = {
            where: {
                id: Number(id), 
                esportista_id: Number(esportista_id)
            } 
        }
        const one = await db[this.modelo].findOne(criteria); 
        return one;        
    }  
    
    /**
     * @param integer id 
     * @param integer esportista_id 
     * @param {*} dados
     * @returns Modelo
     */
    async atualizaItem(id, esportista_id, dados) {
        const criteria = {
            where: {
                id: Number(id), 
                esportista_id: Number(esportista_id)
            }
        }
        await db[this.modelo].update(dados, criteria); // atualiza
        const itemAtualizado = await db[this.modelo].findOne(criteria); // busca denovo
        return itemAtualizado;
    }

    /**
     * @param integer esportista_id 
     * @param {*} dados 
     * @returns Modelo
     */
    async criaItem(esportista_id, dados) {   
        dados.esportista_id = Number(esportista_id);
        const itemCriado = await db[this.modelo].create(dados);
        return itemCriado;
    }

    /**
     * @param integer id 
     * @param integer esportista_id 
     */
    async excluiItem(id, esportista_id) {
        var excluiu = false;
        await db[this.modelo].destroy({ 
            where: { 
                id: Number(id), 
                esportista_id: Number(esportista_id) 
            } 
        }).then(affected => {
            if(affected > 0) {
                excluiu = true;
            }
        }); 
        return excluiu;       
    } 
}

module.exports = DoEsportista;