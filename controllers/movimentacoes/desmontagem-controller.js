/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Desmontagem" de Munição
 ************************************************************************************/
const CRUDController = require('../crud-controller');
const Movimentacao = require('../../models/funcoes/movimentacao');

const tipoMovimentacao = require('../../models/types/movimentacao-tipo');

class DesmontagemController extends CRUDController {
    
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municao_id } = req.params;
            const { dt_movimentacao, quantidade, observacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(quantidade)) {
                return res.status(400).json({message: 'Quantidade e datas de recarga e desmontagem são campos requeridos'});
            }  
            const movimentacaoCriada = await Movimentacao.criar(esportista.id, 
                null, municao_id, null, null, null, 
                {tipo: tipoMovimentacao.desmontagem.value, dt_movimentacao, quantidade, observacao}
            );
            return res.status(200).json(movimentacaoCriada); 
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municao_id, movimentacao_id } = req.params;
            const dados = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }  
            if(dados && dados.tipo) {
                return res.status(409).json({message : `Tipo não é campo permitido`}); 
            }                     
            const movimentacaoAlterada = await Movimentacao.alterar(esportista.id, 
                null, municao_id, null, null,
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

module.exports = DesmontagemController;