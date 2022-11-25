const db = require('../../models');
const pceDoEsportista = require('./pce');
const PceNotFoundError = require('../../shared/errors/pce-not-found');
const InvalidArgumentError = require('../../shared/errors/invalid-argument');

class Compra {

    /**
     * @param number esportista_id
     * @param number pce_id 
     * @param number documento_id
     * @throws PceNotFoundError 
     * @returns Compra | null
     */
    static async busca(esportista_id, pce_id, documento_id) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }  
        const one = await db.Compra.findOne({ where: { pce_id, documento_id } });
        if(!one) {
            return null;
        }
        return one;    
    }

    /**
     * @param number esportista_id
     * @param number pce_id 
     * @throws PceNotFoundError
     * @returns Compra[]
     */
     static async lista(esportista_id, pce_id) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }          
        const all = await db.Compra.findAll({ where: { pce_id }, include: ['Pce','documentoSemConteudo'] });
        return all;    
    }    

    /**
     * @param number esportista_id
     * @param number pce_id 
     * @param number documento_id 
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
     * @param number esportista_id 
     * @param number pce_id 
     * @param number documento_id 
     * @param string dt_compra 
     * @throws Error | PceNotFoundError
     * @returns Compra
     */
    static async criar(esportista_id, pce_id, documento_id, dt_compra) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }        
        var compraCreated = null;
        await db.Compra.create({pce_id, documento_id, dt_compra})
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