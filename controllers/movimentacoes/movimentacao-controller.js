const CRUDController = require('../crud-controller');
const Movimentacao = require('../../models/funcoes/movimentacao');

class MovimentacaoController extends CRUDController {
    
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, local_id, pce_id } = req.params;
            const { tipo, dt_movimentacao, quantidade, proposito, observacao } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(tipo && quantidade && dt_movimentacao)) {
                return res.status(400).json({message: 'Tipo, quantidade e data de movimentação são campos requeridos' });
            }             
            const movimentacaoCriada = await Movimentacao.criar(esportista.id, 
                insumo_id, municao_id, local_id, pce_id,
                {tipo, proposito, dt_movimentacao, quantidade, observacao}
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
            const { insumo_id, municao_id, local_id, pce_id, movimentacao_id } = req.params;
            const dados = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            const movimentacaoAlterada = await Movimentacao.alterar(esportista.id, 
                insumo_id, municao_id, local_id, pce_id,
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

    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, local_id, pce_id, movimentacao_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const excluido = await Movimentacao.excluir(esportista.id, 
                insumo_id, municao_id, local_id, pce_id,
                movimentacao_id
            );
            if(excluido) {
                return res.status(200).json({
                    message: `Movimentação ID ${movimentacao_id} foi excluído com sucesso`
                });
            } else {
                return res.status(404).json({
                    message: `Não foi possível encontrar Movimentação ID ${movimentacao_id}`
                });
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, local_id, pce_id, movimentacao_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const movimentacao = await Movimentacao.buscar(esportista.id, 
                insumo_id, municao_id, local_id, pce_id, 
                movimentacao_id
            );
            if(movimentacao) {
                return res.status(200).json(movimentacao);
            } else { 
                return res.status(404).json({
                    message: `Não foi possível encontrar Movimentação ID ${movimentacao_id}`
                });
            }           
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, local_id, pce_id, exclusivo, offset, limit } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            const lista = await Movimentacao.lista(esportista.id, 
                insumo_id, municao_id, local_id, pce_id, 
                limit, offset, exclusivo
            );
            return res.status(200).json(lista);                        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    }   
       
}

module.exports = MovimentacaoController;