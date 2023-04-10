/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Descarte" de Insumo ou Munição
 ************************************************************************************/
const CRUDController = require('../crud-controller');
const Movimentacao = require('../../models/funcoes/movimentacao');

const tipoMovimentacao = require('../../models/types/movimentacao-tipo');

class DescarteController extends CRUDController {
    
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id } = req.params;
            const { dt_movimentacao, quantidade, observacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(quantidade && dt_movimentacao)) {
                return res.status(400).json({message: 'Quantidade e data de movimentação são campos requeridos' });
            }             
            const movimentacaoCriada = await Movimentacao.criar(esportista.id, 
                insumo_id, municao_id, null, null, null,
                {tipo: tipoMovimentacao.descarte.value, dt_movimentacao, quantidade, observacao}
            ); 
            if(movimentacaoCriada) {
                return res.status(201).json(movimentacaoCriada);
            } else {
                return res.status(400).json({message: `Não foi possível criar Movimentacao`});
            }           
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, movimentacao_id } = req.params;
            const dados = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(dados && dados.tipo) {
                return res.status(409).json({message : `Tipo não é um campo permitido`}); 
            }            
            const movimentacaoAlterada = await Movimentacao.alterar(esportista.id, 
                insumo_id, municao_id, null, null,
                movimentacao_id, dados
            );
            if(movimentacaoAlterada) {
                return res.status(200).json(movimentacaoAlterada);
            } else {
                return res.status(404).json({
                    message: `Não foi possível encontrar Movimentacao ID ${movimentacao_id}`
                });
            }        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
    }
         
}

module.exports = DescarteController;