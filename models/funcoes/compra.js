/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe de métodos estáticos que manipulam os objetos do modelo sequelize 
 *          "Compra" e Pce associado a Esportista.
 *          Utiliza a instância "Pce do Esportista" 
 *          @see models\funcoes\pce.js
 ************************************************************************************/
const db = require('../../models');
const pceDoEsportista = require('./pce');
const PceNotFoundError = require('../../shared/errors/pce-not-found');

class Compra {

    /**
     * @param integer esportista_id
     * @param integer pce_id 
     * @param integer documento_id
     * @throws PceNotFoundError 
     * @returns Compra | null
     */
    static async busca(esportista_id, pce_id, documento_id) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        const criteria = {
            where: { 
                pce_id: Number(pce_id), 
                documento_id: Number(documento_id) 
            }
        }
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }  
        const one = await db.Compra.findOne(criteria);
        return one;    
    }

    /**
     * @param integer esportista_id
     * @param integer pce_id
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @throws PceNotFoundError
     * @returns {*}
     */
     static async lista(esportista_id, pce_id, limit=null, offset=null) {
        var all = [];
        var total = 0;
        var criteria = { 
            where: { pce_id: Number(pce_id) }, 
            include: ['Pce','documentoSemConteudo'] 
        } 
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }              
        if(limit === null || offset === null) {
            all = await db.Compra.findAll(criteria);
            return all;            
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset)
            await db.Compra.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'Compra', total, rows : all};            
        }            
    }    

    /**
     * @param integer esportista_id
     * @param integer pce_id 
     * @param integer documento_id 
     * @throws PceNotFoundError
     * @returns boolean
     */
    static async existe(esportista_id, pce_id, documento_id) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }          
        const existe = await Compra.busca(esportista_id, pce_id, documento_id);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param integer esportista_id 
     * @param integer pce_id 
     * @param integer documento_id 
     * @param string dt_compra 
     * @throws Error | PceNotFoundError
     * @returns Compra | null
     */
    static async criar(esportista_id, pce_id, documento_id, dt_compra) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }        
        var compraCreated = null;
        await db.Compra.create({pce_id: Number(pce_id), documento_id: Number(documento_id), dt_compra})
            .then(compra => {
                compraCreated = compra;
            }).catch(error => {
                throw new Error(
                    `Não possível criar Compra para o pce ID ${pce_id} ` + 
                    `averbada pelo documento ID ${documento_id}. `+ 
                    `${error.message}`
                );
            });
        return compraCreated;
    }    
}

module.exports = Compra;