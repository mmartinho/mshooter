const db = require('../../models');

class Habitualidade {    
    
    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer habitualidade_id 
     * @returns Habitualidade | null
     */
    static async buscar(esportista_id, municaoutilizada_id, habitualidade_id){
        const criteria = {
            where: {
                esportista_id: Number(esportista_id), 
                municaoutilizada_id: Number(municaoutilizada_id),
                id: Number(habitualidade_id)
            },
            include: ['MunicaoUtilizada', 'documentoSemConteudo']
        }        
        const habitualidade = await db.Habitualidade.findOne(criteria);
        return habitualidade;
    }

    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer documento_id 
     * @returns boolean
     */
    static async existe(esportista_id, municaoutilizada_id, documento_id) {       
        const existe = await db.Habitualidade.findOne({
            where: {
                esportista_id: Number(esportista_id),
                municaoutilizada_id: Number(municaoutilizada_id),
                documento_id: Number(documento_id)
            }
        });
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }

    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer habitualidade_id 
     * @returns boolean
     */
    static async excluir(esportista_id, municaoutilizada_id, habitualidade_id){
        var excluiu=false;
        const criteria = {
            where: {
                esportista_id: Number(esportista_id), 
                municaoutilizada_id: Number(municaoutilizada_id),
                id: Number(habitualidade_id)
            }
        }        
        await db.Habitualidade.destroy(criteria).then(affected => {
            if(affected > 0) {
                excluiu=true; 
            }
        });
        return excluiu;
    }    

    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer documento_id 
     * @returns Habitualidade
     */
    static async criar(esportista_id, municaoutilizada_id, documento_id) {
        const habitualidade = await db.Habitualidade.create({
            esportista_id: Number(esportista_id), 
            municaoutilizada_id: Number(municaoutilizada_id), 
            documento_id: Number(documento_id)
        });
        return habitualidade;
    }

    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer habitualidade_id 
     * @returns Habitualidade | null
     */
    static async atualizar(esportista_id, municaoutilizada_id, habitualidade_id) {
        const criteria = {
            where:{
                esportista_id: Number(esportista_id),
                municaoutilizada_id: Number(municaoutilizada_id),
                habitualidade_id: Number(habitualidade_id)
            }
        }
        await db.Habitualidade.update({documento_id:Number(documento_id)}, criteria);
        const habitualidade = db.Habitualidade.findOne(criteria);
        return habitualidade;
    }    
   
    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @returns []
     */
    static async lista(esportista_id, municaoutilizada_id, limit=null, offset=null) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {
                esportista_id: Number(esportista_id), 
                municaoutilizada_id: Number(municaoutilizada_id)
            },
            include: ['MunicaoUtilizada', 'documentoSemConteudo']
        }   
        if(limit === null || offset === null) {
            const all = await db.Habitualidade.findAll(criteria);
            return all; 
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db.Habitualidade.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'Habitualidade', total, rows : all};            
        }        
    }
}

module.exports = Habitualidade;