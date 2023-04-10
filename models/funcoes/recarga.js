/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe de métodos estáticos que manipulam os objetos do modelo sequelize
 *          "Movimentacao" de recarga
 ************************************************************************************/
const db = require('../../models');
const tipoMovimentacao = require('../../models/types/movimentacao-tipo');
const { Op } = require("sequelize");

class Recarga {

    /**
     * @param {*} espoleta 
     * @param {*} projetil 
     * @returns boolean
     */
    static verifica(espoleta=null, projetil=null) {
        var verificacao = true;
        if(espoleta){
            if(!espoleta.insumo_id) {
                verificacao = false;
            }
        }
        if(projetil) {
            if(!projetil.insumo_id) {
                verificacao = false;
            } 
        }
        return verificacao;                   
    }

    /**
     * @param number esportista_id 
     * @param number municao_id 
     * @param string dt_movimentacao 
     * @param {*} espoleta 
     * @param {*} projetil 
     * @returns {*}
     */
    static async criar(esportista_id, municao_id, dt_movimentacao, quantidade, espoleta=null, projetil=null) {
        var insumosUtilizados = { espoleta: {}, projetil: {}};
        var municaoRecarregada = {};
        if(espoleta) {
            espoleta.esportista_id = Number(esportista_id);
            espoleta.tipo = tipoMovimentacao.utilizacao.value;
            espoleta.dt_movimentacao = dt_movimentacao;
            espoleta.municao_id = municao_id; 
            espoleta.quantidade = Number(quantidade);    
            insumosUtilizados.espoleta = await db.Movimentacao.create(espoleta);
        }
        if(projetil) {
            projetil.esportista_id = Number(esportista_id);
            projetil.tipo = tipoMovimentacao.utilizacao.value;
            projetil.dt_movimentacao = dt_movimentacao;
            projetil.municao_id = municao_id;
            projetil.quantidade = Number(quantidade);
            insumosUtilizados.projetil = await db.Movimentacao.create(projetil);     
        }
        municaoRecarregada = await db.Movimentacao.create({
            esportista_id,
            municao_id,
            dt_movimentacao,
            tipo: tipoMovimentacao.recarga.value,
            quantidade: Number(quantidade)
        });
        return {insumosUtilizados, municaoRecarregada};
    }   

    /**
     * @param number esportista_id 
     * @param number municao_id 
     * @param string dt_movimentacao 
     * @param number limit 
     * @param number offset 
     * @returns 
     */
    static async listar(esportista_id, municao_id, dt_movimentacao=null, limit=null, offset=null) {
        var all = [];
        var total = 0; 
        var criteria = {
            where: {
                esportista_id: Number(esportista_id), 
                municao_id : Number(municao_id), 
                [Op.or] : [
                    {tipo: tipoMovimentacao.recarga.value},
                    {tipo: tipoMovimentacao.utilizacao.value},
                ]
            }, 
            include: ['Municao','Insumo']           
        } 
        if(dt_movimentacao) {
            criteria.where.dt_movimentacao = dt_movimentacao;
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

    /**
     * @param number esportista_id 
     * @param number municao_id 
     * @param string dt_movimentacao 
     * @returns integer
     */
    static async excluir(esportista_id, municao_id, dt_movimentacao) {
        var excluidos = 0;
        var criteria = {
            where: {
                dt_movimentacao,
                esportista_id: Number(esportista_id), 
                municao_id : Number(municao_id), 
                [Op.or] : [
                    {tipo: tipoMovimentacao.recarga.value},
                    {tipo: tipoMovimentacao.utilizacao.value},
                ]
            }           
        };        
        await db.Movimentacao.destroy(criteria).then(affected =>{excluidos = affected;}); 
        return excluidos;        
    }
    
}

module.exports = Recarga;