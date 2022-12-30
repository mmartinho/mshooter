const db = require('../../models');

class MunicaoUtilizada { 
    
    /**
     * @param integer esportista_id 
     * @param integer local_id 
     * @param integer pce_id 
     * @param integer municao_id 
     * @param integer municaoutilizada_id 
     * @returns MunicaoUtilizada | null
     */
    static async buscar(esportista_id, local_id, pce_id, municao_id, municaoutilizada_id) {
        const municaoUtilizada = await db.MunicaoUtilizada.findOne({
            where:{
                esportista_id: Number(esportista_id), 
                local_id: Number(local_id), 
                pce_id: Number(pce_id), 
                municao_id: Number(municao_id),
                id: Number(municaoutilizada_id)
            },
            include:['Local', 'Pce', 'Municao']
        });
        return municaoUtilizada;
    }

    /**
     * @param integer esportista_id 
     * @param integer municaoutilizada_id 
     * @returns MunicaoUtilizada | null
     */
    static async encontrar(esportista_id, municaoutilizada_id) {
        const municaoUtilizada = await db.MunicaoUtilizada.findOne({
            where:{
                esportista_id: Number(esportista_id), 
                id: Number(municaoutilizada_id)
            }
        });
        return municaoUtilizada;
    }    

    /**
     * @param integer esportista_id 
     * @param integer local_id 
     * @param integer pce_id 
     * @param integer municao_id 
     * @param {*} dados 
     * @returns MunicaoUtilizada
     */
    static async criar(esportista_id, local_id, pce_id, municao_id, dados) {
        dados.esportista_id = Number(esportista_id);
        dados.local_id = Number(local_id);
        dados.pce_id = Number(pce_id);
        dados.municao_id = Number(municao_id);
        const municaoUtilizada = await db.MunicaoUtilizada.create(dados);
        return municaoUtilizada;
    }

    /**
     * @param integer esportista_id 
     * @param integer local_id 
     * @param integer pce_id 
     * @param integer municao_id 
     * @param integer municaoutilizada_id 
     * @param {*} dados 
     * @returns MunicaoUtilizada | null
     */
    static async alterar(esportista_id, local_id, pce_id, municao_id, municaoutilizada_id, dados) {
        const where = {
            esportista_id: Number(esportista_id), 
            local_id: Number(local_id), 
            pce_id: Number(pce_id), 
            municao_id: Number(municao_id), 
            id: Number(municaoutilizada_id)
        }            
        await db.MunicaoUtilizada.update(dados, {where:where});
        const municaoUtilizada = await db.MunicaoUtilizada.findOne({
            where: where,
            include:['Local', 'Pce', 'Municao']
        });
        return municaoUtilizada;
    } 
    
    /**
     * @param integer esportista_id 
     * @param integer local_id 
     * @param integer pce_id 
     * @param integer municao_id 
     * @param integer municaoutilizada_id 
     * @returns boolean
     */
    static async excluir(esportista_id, local_id, pce_id, municao_id, municaoutilizada_id) {
        var excluida=false;
        await db.MunicaoUtilizada.destroy({where: {
            esportista_id : Number(esportista_id), 
            local_id: Number(local_id), 
            pce_id: Number(pce_id), 
            municao_id: Number(municao_id), 
            id: Number(municaoutilizada_id) 
        }}).then( affected => {
            if(affected > 0) {
                excluida = true;
            }
        });
        return excluida;
    }

    /**
     * 
     * @param integer esportista_id 
     * @param integer local_id 
     * @param integer pce_id 
     * @param integer municao_id 
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @returns []
     */
    static async lista(esportista_id, local_id, pce_id, municao_id, limit=null, offset=null) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {
                esportista_id: Number(esportista_id), 
                local_id: Number(local_id),
                pce_id: Number(pce_id),
                municao_id: Number(municao_id)
            }, 
            include: ['Local', 'Municao', 'Pce']           
        }
        if(limit === null || offset === null) {
            const all = await db.MunicaoUtilizada.findAll(criteria);
            return all; 
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db.MunicaoUtilizada.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'MunicaoUtilizada', total, rows : all};            
        }        
    }
   
}

module.exports = MunicaoUtilizada;