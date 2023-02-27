const { Op, fn, col } = require('sequelize');
const db = require('../../models');
const tipoMovimentacao = require('../types/movimentacao-tipo');

class Estoque {
    /**
     * @param [] dados 
     * @returns number
     */
    static somatoria(dados) {
        var soma=0;
        dados.forEach(dado=>{soma += Number(dado.total);});
        return soma;
    }

    /**
     * @param number esportista_id 
     * @param {*} insumo
     * @returns {*} null
     */
    static async insumo(esportista_id, insumo) {
        /** Todas as 'entradas' do insumo exceto recarga */ 
        var whereEntrada = {esportista_id: Number(esportista_id), insumo_id : insumo.id,
            tipo: {[Op.or]: tipoMovimentacao.entradas([tipoMovimentacao.recarga.value])}
        };
        /** Todas as 'saídas' do insumo exceto desmontagem */
        var whereSaida = {esportista_id: Number(esportista_id), insumo_id : insumo.id, 
            tipo: {[Op.or]: tipoMovimentacao.saidas([tipoMovimentacao.desmontagem.value])}
        };
        /** Soma todas as 'entradas' */
        const entradas = await db.Movimentacao.findAll({where : whereEntrada, raw:true,
            attributes: [[fn('sum', col('quantidade')),'total']]
        });
        /** Soma todas as 'saídas' */
        const saidas = await db.Movimentacao.findAll({where: whereSaida, raw: true,
            attributes: [[fn('sum', col('quantidade')),'total']]
        });
        const saldo = Estoque.somatoria(entradas) - Estoque.somatoria(saidas);
        return {
            model: 'Insumo',
            nome: insumo.nome,
            saldo, 
            saidas : Number(saidas[0].total),
            entradas : Number(entradas[0].total)
        };
    }
    
    /**
     * @param number esportista_id 
     * @param {*} municao
     * @returns {*} null
     */
    static async municao(esportista_id, municao) {
        /** Todas as 'entradas' da municao exceto reutilizacao */ 
        var whereEntrada = {esportista_id: Number(esportista_id), municao_id : municao.id,
            tipo: {[Op.or]: tipoMovimentacao.entradas([tipoMovimentacao.reutilizacao.value])},
            insumo_id : {[Op.eq]: null}
        };
        /** Todas as 'saídas' da municao */
        var whereSaida = {esportista_id: Number(esportista_id), municao_id : municao.id, 
            tipo: {[Op.or]: tipoMovimentacao.saidas([])},
            insumo_id : {[Op.eq]: null}
        };
        /** Soma todas as 'entradas' */
        const entradas = await db.Movimentacao.findAll({where : whereEntrada, raw:true,
            attributes: [[fn('sum', col('quantidade')),'total']]
        });
        /** Soma todas as 'saídas' */
        const saidas = await db.Movimentacao.findAll({where: whereSaida, raw: true,
            attributes: [[fn('sum', col('quantidade')),'total']]
        });
        const saldo = Estoque.somatoria(entradas) - Estoque.somatoria(saidas);
        return {
            model: 'Municao',
            nome: municao.nome,
            saldo, 
            saidas : Number(saidas[0].total),
            entradas : Number(entradas[0].total)
        };
    }     
};

module.exports = Estoque;