const db = require('../../models');
const { Op } = require('sequelize');

class Movimentacao { 
    
    /**
     * @param integer esportista_id 
     * @param integer insumo_id (default null)
     * @param integer municao_id (default null) 
     * @param integer local_id (default null)
     * @param integer pce_id (default null)
     * @param integer movimentacao_id 
     * @returns Movimentacao | null 
     */
    static async buscar(esportista_id, 
        insumo_id=null, municao_id=null, local_id=null, pce_id=null,
        movimentacao_id
    ) {
        var where = {};
        if(insumo_id) {
            where.insumo_id = Number(insumo_id)
        }
        if(municao_id) {
            where.municao_id = Number(municao_id)
        }
        if(local_id) {
            where.local_id = Number(local_id)
        } 
        if(pce_id) {
            where.pce_id = Number(pce_id)
        }               
        where.esportista_id = Number(esportista_id);
        where.id = Number(movimentacao_id);        
        const mov = await db.Movimentacao.findOne({where, include:[
            'Insumo','Municao','Local','Pce','Comunicacao'
        ]});
        return mov;
    }

    /**
     * @param integer esportista_id 
     * @param integer movimentacao_id 
     * @returns Movimentacao | null
     */
    static async encontrar(esportista_id, movimentacao_id) {
        const mov = await db.Movimentacao.findOne({
            where:{
                esportista_id: Number(esportista_id), 
                id: Number(movimentacao_id)
            }
        });
        return mov;
    }    

    /**
     * @param integer esportista_id 
     * @param integer insumo_id (default null)
     * @param integer municao_id (default null) 
     * @param integer local_id (default null)
     * @param integer pce_id (default null)
     * @param integer comunicacao_id (default null)
     * @param {*} dados 
     * @returns Movimentacao
     */
    static async criar(esportista_id, 
        insumo_id=null, municao_id=null, local_id=null, pce_id=null, comunicacao_id=null,
        dados
    ) {
        dados.esportista_id = Number(esportista_id);
        if(insumo_id) {
            dados.insumo_id = Number(insumo_id);
        }
        if(municao_id) {
            dados.municao_id = Number(municao_id);
        }
        if(local_id) {
            dados.local_id = Number(local_id);
        }  
        if(pce_id) {
            dados.pce_id = Number(pce_id);
        }       
        if(comunicacao_id) {
            dados.comunicacao_id = Number(comunicacao_id);
        }                        
        const mov = await db.Movimentacao.create(dados);
        return mov;
    }

    /**
     * @param integer esportista_id 
     * @param integer insumo_id (default null)
     * @param integer municao_id (default null) 
     * @param integer local_id (default null)
     * @param integer pce_id (default null) 
     * @param integer movimentacao_id 
     * @param {*} dados 
     * @returns Movimentacao | null
     */
    static async alterar(esportista_id, 
        insumo_id=null, municao_id=null, local_id=null, pce_id=null,
        movimentacao_id, dados
    ) {
        var where = {};
        if(insumo_id) {
            where.insumo_id=Number(insumo_id)
        }
        if(municao_id) {
            where.municao_id=Number(municao_id)
        }
        if(local_id) {
            where.local_id=Number(local_id)
        }  
        if(pce_id) {
            where.pce_id=Number(pce_id)
        }               
        where.esportista_id = Number(esportista_id);
        where.id = Number(movimentacao_id);
        await db.Movimentacao.update(dados, {where});
        const mov = await db.Movimentacao.findOne({where, include:[
            'Insumo','Municao','Local','Pce','Comunicacao'
        ]});
        return mov;
    } 
    
    /**
     * @param integer esportista_id 
     * @param integer insumo_id (default null)
     * @param integer municao_id (default null) 
     * @param integer local_id (default null)
     * @param integer pce_id (default null)
     * @param integer movimentacao_id 
     * @returns boolean
     */
    static async excluir(esportista_id, 
        insumo_id=null, municao_id=null, local_id=null, pce_id=null,
        movimentacao_id
    ) {
        var excluida=false;
        var where = {};
        if(insumo_id) {
            where.insumo_id=Number(insumo_id)
        }
        if(municao_id) {
            where.municao_id=Number(municao_id)
        } 
        if(local_id) {
            where.local_id=Number(local_id)
        } 
        if(pce_id) {
            where.pce_id=Number(pce_id)
        }               
        where.esportista_id = Number(esportista_id);
        where.id = Number(movimentacao_id);               
        await db.Movimentacao.destroy({where}).then(
            affected => {if(affected > 0) {excluida = true;}}
        );
        return excluida;
    }

    /**
     * @param integer esportista_id 
     * @param integer insumo_id (default null)
     * @param integer municao_id (default null)
     * @param integer local_id (default null)
     * @param integer pce_id (default null)
     * @param integer limit (default null)
     * @param integer offset (default null)
     * @param boolean exclusivo (default false)
     * @param string  dt_movimentacao (default null)
     * @param array   tipos (default [])
     * @param boolean eager (default true)
     * @returns []
     */
    static async lista(esportista_id, 
        insumo_id=null, municao_id=null, local_id=null, pce_id=null, 
        limit=null, offset=null, exclusivo=false, dt_movimentacao=null, tipos=[],
        eager=true
    ) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {esportista_id: Number(esportista_id)}           
        }
        if(eager) {
            criteria.include = ['Insumo','Municao','Local','Pce','Comunicacao'];
        }
        if(insumo_id) {
            criteria.where.insumo_id = Number(insumo_id);
            if(exclusivo) {criteria.where.municao_id = null;}
        }
        if(municao_id) {
            criteria.where.municao_id = Number(municao_id);
            if(exclusivo) {criteria.where.insumo_id = null;}
        }
        if(local_id) {
            criteria.where.local_id = Number(local_id);
        }  
        if(pce_id) {
            criteria.where.pce_id = Number(pce_id);
        } 
        if(dt_movimentacao) {
            criteria.where.dt_movimentacao = dt_movimentacao;
        }  
        if(tipos.length > 0) {
            criteria.where.tipo = {[Op.or]: tipos};
        }            
        if(limit === null || offset === null) {
            const all = await db.Movimentacao.findAll(criteria);
            return all; 
        } else {
            criteria.limit = Number(limit);
            criteria.offset = Number(offset);
            await db.Movimentacao.findAndCountAll(criteria).then((result)=> {
                all = result.rows;
                total = result.count;
            });
            return { model:'Movimentacao', total, rows : all};            
        }        
    }
   
}

module.exports = Movimentacao;