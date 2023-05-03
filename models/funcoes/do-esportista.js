/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe instanciável que manipula os objetos de modelo sequelize passado 
 *          no método construtor desta   
 ************************************************************************************/
const db = require('../../models');
const {Op, DataTypes} = require('sequelize');

/**
 * Manipula o modelo que possui escopo de Esportista
 */
class DoEsportista {
    constructor(modelo) {
        this.modelo = modelo;
    }

    /**
     * Build a Sequelize where criteria to verify if "str"
     * is inside any model STRING or TEXT fields 
     * 
     * @param string str 
     * @param string model 
     * @returns {*} | null
     */
    fullTextSearchCriteria(str) {
        var criterios = [];
        if(str) {
            const atributos = this.atributos();
            Object.keys(atributos).forEach((atributo)=>{
                if(atributos[atributo].type instanceof DataTypes.STRING) {
                    criterios.push(
                        {[atributo]: {[Op.like]: `%${str}%`}}
                    )
                }
            }); 
            return criterios.length > 1 ? {[Op.or]:criterios} : (criterios.length == 1 ? criterios[0] : null);
        }
        return null;
    }  

    /**
     * @returns object
     */
    atributos() {
        return db[this.modelo].getAttributes();
    }

    /**
     * @param integer esportista_id
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @returns {*}
     */
    async lista(esportista_id, limit=null, offset=null, str=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: {esportista_id: Number(esportista_id)} 
        }     
        if(str) {
            criteria.where = {
                ...criteria.where, 
                ...this.fullTextSearchCriteria(str)
            }; 
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