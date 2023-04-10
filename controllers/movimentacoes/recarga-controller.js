/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Recarga" de Munição
 ************************************************************************************/
const CRUDController = require('../crud-controller');
const Recarga = require('../../models/funcoes/recarga');

class RecargaController extends CRUDController {
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municao_id } = req.params;
            const { dt_movimentacao, quantidade, espoleta, projetil } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            if(!(espoleta || projetil) || !Recarga.verifica(espoleta, projetil)) {
                return res.status(400).json({message : `É necessário especificar no mínimo o Projétil utilizado`});
            } 
            if(!dt_movimentacao) {
                return res.status(400).json({message : `Data de movimentação é campo requerido`});
            }  
            if(!quantidade) {
                return res.status(400).json({message : `Quantidade é campo requerido`});
            }        
            const recarga = await Recarga.criar(esportista.id, municao_id, dt_movimentacao, quantidade, espoleta, projetil);        
            if(recarga) {
                return res.status(201).json(recarga);
            } else {
                return res.status(400).json({message: `Não foi possível criar Movimentações de recarga`});
            }           
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    } 
    
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municao_id, limit, offset } = req.params;
            const { dt_movimentacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            if(!dt_movimentacao) {
                return res.status(400).json({message : `Data de movimentação é requerida`});
            }                        
            const lista = await Recarga.listar(esportista.id, municao_id, dt_movimentacao, limit, offset);
            return res.status(200).json(lista);
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }
    
    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municao_id } = req.params;
            const { dt_movimentacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            if(!dt_movimentacao) {
                return res.status(400).json({message : `Data de movimentação é requerida`});
            } 
            const excluidos = await Recarga.excluir(esportista.id, municao_id, dt_movimentacao);
            if(excluidos > 0) {
                return res.status(200).json({
                    message: `Foram excluídas ${excluidos} movimentações de recarga da Munição ID ${municao_id}`
                });
            } else {
                return res.status(404).json({
                    message: `Não foram encontradas movimentações de recarga da Munição ID ${municao_id}`
                });
            }
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }
}

module.exports = RecargaController;