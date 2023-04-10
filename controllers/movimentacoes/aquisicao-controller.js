/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Aquisicao" de Insumo ou Munição
 ************************************************************************************/
const CRUDController = require('../crud-controller');
const Movimentacao = require('../../models/funcoes/movimentacao');
const tipoMovimentacao = require('../../models/types/movimentacao-tipo');
const tipoLocal = require('../../models/types/local-tipo');
const localDoEsportista = require('../../models/funcoes/local');

class AquisicaoController extends CRUDController {
    
    static async cria(req, res) {
        var fornecedores = []; var local_id=null;
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id } = req.params;
            const { dt_movimentacao, quantidade, observacao, fornecedor } = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(quantidade && dt_movimentacao)) {
                return res.status(400).json({message: 'Quantidade e data de movimentação são campos requeridos'});
            }   
            if(fornecedor && fornecedor.nome && fornecedor.cnpj && fornecedor.endereco) {
                fornecedores = await localDoEsportista.listaPorCampos(esportista.id, tipoLocal.fornecedor.value, null, fornecedor.cnpj);
                if(fornecedores.length == 0) {
                    const novoFornecedor = await localDoEsportista.criaItem(esportista.id, fornecedor); 
                    local_id = novoFornecedor.id;
                } else {
                    local_id = fornecedores[0].id;
                }
            } else {
                return res.status(400).json({message: 'Nome, CPNJ e endereço do fornecedor são campos requeridos'});
            }   
            const movimentacaoCriada = await Movimentacao.criar(esportista.id, 
                insumo_id, municao_id, local_id, null, null,
                {tipo: tipoMovimentacao.aquisicao.value, dt_movimentacao, quantidade, observacao}
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
        var fornecedores = []; var local_id=null;
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumo_id, municao_id, movimentacao_id } = req.params;
            const dados = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            if(dados && dados.tipo) {
                return res.status(409).json({message : `Tipo não é campo permitido`});
            } 
            if(dados.fornecedor && dados.fornecedor.cnpj && dados.fornecedor.nome && dados.fornecedor.endereco) {
                fornecedores = await localDoEsportista.listaPorCampos(esportista.id, tipoLocal.fornecedor.value, null, dados.fornecedor.cnpj);
                if(fornecedores.length == 0) {
                    const novoFornecedor = await localDoEsportista.criaItem(esportista.id, dados.fornecedor); 
                    local_id = novoFornecedor.id;
                } else {
                    local_id = fornecedores[0].id;
                }
            }                    
            const movimentacaoAlterada = await Movimentacao.alterar(esportista.id, 
                insumo_id, municao_id, local_id, null,
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

module.exports = AquisicaoController;