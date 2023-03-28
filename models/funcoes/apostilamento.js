const db = require('../../models');
const pceDoEsportista = require('./pce');
const PceNotFoundError = require('../../shared/errors/pce-not-found');

class Apostilamento {

    /**
     * @param integer esportista_id
     * @param integer pce_id 
     * @param integer documento_id
     * @throws PceNotFoundError 
     * @returns Apostilamento | null
     */
    static async busca(esportista_id, pce_id, documento_id) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        const criteria = {
            where:{
                pce_id: Number(pce_id), 
                documento_id: Number(documento_id)
            }            
        }
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }  
        const one = await db.Apostilamento.findOne(criteria);
        return one;    
    }    

    /**
     * @param integer esportista_id
     * @param integer pce_id
     * @param integer limit
     * @param integer offset 
     * @throws PceNotFoundError
     * @returns {*}
     */
     static async lista(esportista_id, pce_id, limit=null, offset=null) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {pce_id: Number(pce_id)},
            include : ['Pce','documentoSemConteudo']            
        }
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }              
        if(limit === null || offset === null) {
            all = await db.Apostilamento.findAll(criteria);
            return all;            
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db.Apostilamento.findAndCountAll(criteria).then((result) => {
                all = result.rows;
                total = result.count;
            });
            return { model:'Apostilamento', total, rows : all};            
        }            
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
        const existe = await Apostilamento.busca(esportista_id, pce_id, documento_id);
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
     * @param string dt_apostilamento 
     * @throws Error
     * @returns Apostilamento | null
     */
    static async criar(esportista_id, pce_id, documento_id, dt_apostilamento) {
        const pce = await pceDoEsportista.item(pce_id, esportista_id);
        if(!pce) {
            throw new PceNotFoundError(`PCE ID ${pce_id} não é do esportista ID ${esportista_id} ou não existe`);
        }        
        var apostilamentoCreated = null;
        await db.Apostilamento.create({pce_id : Number(pce_id), documento_id: Number(documento_id), dt_apostilamento})
            .then(apostilamento => {
                apostilamentoCreated = apostilamento;
            }).catch(error => {
                throw new Error(
                    `Não possível criar Apostilamento para o pce ID ${pce_id} ` + 
                    `averbado pelo documento ID ${documento_id}. `+ 
                    `${error.message}`
                );
            });
        return apostilamentoCreated;
    }    
}

module.exports = Apostilamento;