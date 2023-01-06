const CRUDController = require('./crud-controller');
const InsumoMovimentacao = require('../models/funcoes/insumo-movimentacao');

class InsumoMovimentacaoController extends CRUDController {
    
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id } = req.params;
            const { tipo, dt_movimentacao, quantidade, unidade, observacao } = req.body;
            const { dthr_comunicacao, email_comunicacao, protocolo_comunicacao} = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(tipo && quantidade && unidade && dt_movimentacao)) {
                return res.status(400).json({message: 'Tipo, quantidade, unidade e data de movimentação são campos requeridos' });
            }             
            const insumoMovimentacaoCriado = await InsumoMovimentacao.criar(
                esportista.id, insumo_id, municao_id, 
                {
                    tipo, dt_movimentacao, quantidade, unidade, observacao,
                    dthr_comunicacao, email_comunicacao, protocolo_comunicacao
                }
            ); 
            if(insumoMovimentacaoCriado) {
                return res.status(201).json(insumoMovimentacaoCriado);
            } else {
                return res.status(400).json({message: `Não foi possível criar InsumoMovimentacao`});
            }           
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, insumomovimentacao_id } = req.params;
            const { tipo, dt_movimentacao, quantidade, unidade, observacao } = req.body;
            const { dthr_comunicacao, email_comunicacao, protocolo_comunicacao} = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            const insumoMovimentacaoAlterado = await InsumoMovimentacao.alterar(
                esportista.id, insumo_id, municao_id, insumomovimentacao_id,
                {
                    tipo, dt_movimentacao, quantidade, unidade, observacao,
                    dthr_comunicacao, email_comunicacao, protocolo_comunicacao
                }
            );
            if(insumoMovimentacaoAlterado) {
                return res.status(200).json(insumoMovimentacaoAlterado);
            } else {
                return res.status(404).json({
                    message: `Não foi possível encontrar InsumoMovimentacao ID ${insumomovimentacao_id}`
                });
            }        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
    }

    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, insumomovimentacao_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const excluido = await InsumoMovimentacao.excluir(
                esportista.id, insumo_id, municao_id, insumomovimentacao_id
            );
            if(excluido) {
                return res.status(200).json({
                    message: `Insumo Utilizado ID ${insumomovimentacao_id} foi excluído com sucesso`
                });
            } else {
                return res.status(404).json({
                    message: `Não foi possível encontrar Insumo Utilizado ID ${insumomovimentacao_id}`
                });
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, insumomovimentacao_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const insumoMovimentacao = await InsumoMovimentacao.buscar(
                esportista.id, insumo_id, municao_id, insumomovimentacao_id
            );
            if(insumoMovimentacao) {
                return res.status(200).json(insumoMovimentacao);
            } else { 
                return res.status(404).json({
                    message: `Não foi possível encontrar InsumoMovimentacao ID ${insumomovimentacao_id}`
                });
            }           
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, offset, limit } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            const insumosUtilizados = await InsumoMovimentacao.lista(esportista.id, insumo_id, municao_id, limit, offset);
            return res.status(200).json(insumosUtilizados);                        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    }    
   
}

module.exports = InsumoMovimentacaoController;