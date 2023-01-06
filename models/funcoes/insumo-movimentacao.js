const db = require('../../models');

class InsumoMovimentacao { 
    
    /**
     * @param integer esportista_id 
     * @param integer insumo_id 
     * @param integer municao_id
     * @param integer insumomovimentacao_id 
     * @returns InsumoMovimentacao | null 
     */
    static async buscar(esportista_id, insumo_id, municao_id, insumomovimentacao_id) {
        const insumoMovimentacao = await db.InsumoMovimentacao.findOne({
            where:{
                esportista_id: Number(esportista_id), 
                insumo_id: Number(insumo_id),
                municao_id: Number(municao_id),
                id: Number(insumomovimentacao_id)
            },
            include:['Insumo','Municao']
        });
        return insumoMovimentacao;
    }

    /**
     * @param integer esportista_id 
     * @param integer insumomovimentacao_id 
     * @returns InsumoMovimentacao | null
     */
    static async encontrar(esportista_id, insumomovimentacao_id) {
        const insumoUtilizada = await db.InsumoMovimentacao.findOne({
            where:{
                esportista_id: Number(esportista_id), 
                id: Number(insumomovimentacao_id)
            }
        });
        return insumoUtilizada;
    }    

    /**
     * @param integer esportista_id 
     * @param integer insumo_id
     * @param integer municao_id 
     * @param {*} dados 
     * @returns InsumoMovimentacao
     */
    static async criar(esportista_id, insumo_id, municao_id, dados) {
        dados.esportista_id = Number(esportista_id);
        dados.insumo_id = Number(insumo_id);
        dados.municao_id = Number(municao_id);
        const insumoMovimentacao = await db.InsumoMovimentacao.create(dados);
        return insumoMovimentacao;
    }

    /**
     * @param integer esportista_id 
     * @param integer insumo_id 
     * @param integer municao_id 
     * @param integer insumomovimentacao_id 
     * @param {*} dados 
     * @returns InsumoMovimentacao | null
     */
    static async alterar(esportista_id, insumo_id, municao_id, insumomovimentacao_id, dados) {
        const where = {
            esportista_id: Number(esportista_id), 
            insumo_id: Number(insumo_id),  
            municao_id: Number(municao_id), 
            id: Number(insumomovimentacao_id)
        }            
        await db.InsumoMovimentacao.update(dados, {where:where});
        const insumoMovimentacao = await db.InsumoMovimentacao.findOne({
            where: where,
            include:['Insumo','Municao']
        });
        return insumoMovimentacao;
    } 
    
    /**
     * @param integer esportista_id 
     * @param integer insumo_id 
     * @param integer municao_id 
     * @param integer insumomovimentacao_id 
     * @returns boolean
     */
    static async excluir(esportista_id, insumo_id, municao_id, insumomovimentacao_id) {
        var excluida=false;
        await db.InsumoMovimentacao.destroy({where: {
            esportista_id : Number(esportista_id), 
            insumo_id: Number(insumo_id), 
            municao_id: Number(municao_id), 
            id: Number(insumomovimentacao_id) 
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
     * @param integer insumo_id 
     * @param integer municao_id 
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @returns []
     */
    static async lista(esportista_id, insumo_id, municao_id, limit=null, offset=null) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {esportista_id: Number(esportista_id)}, 
            include: ['Insumo','Municao']           
        }
        if(insumo_id) {
            criteria.where.insumo_id = Number(insumo_id);
        }
        if(municao_id) {
            criteria.where.municao_id = Number(municao_id);
        }
        if(limit === null || offset === null) {
            const all = await db.InsumoMovimentacao.findAll(criteria);
            return all; 
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db.InsumoMovimentacao.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'InsumoMovimentacao', total, rows : all};            
        }        
    }
   
}

module.exports = InsumoMovimentacao;