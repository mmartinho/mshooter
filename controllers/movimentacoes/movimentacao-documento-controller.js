/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Documento de Movimentação" (entrada/saída) de
 *          Insumo ou Munição
 ************************************************************************************/
const CRUDController = require('../crud-controller');
const Documento = require('../../models/funcoes/documento');
const MovimentacaoDocumento = require('../../models/funcoes/movimentacao-documento');

class MovimentacaoDocumentoController extends CRUDController {
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id, limit, offset } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const lista = await MovimentacaoDocumento.lista(esportista.id, movimentacao_id, limit, offset);  
            return res.status(200).json(lista);          
        } catch (error) {
            return res.status(500).json({message: error.message});  
        }
    }

    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id, documento_id } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const documento = await MovimentacaoDocumento.mostra(esportista.id, movimentacao_id, documento_id);  
            if(documento) {
                return res.status(200).json(documento);               
            } else {
                return res.status(404).json({message: `Documento ID ${documento_id} não existe`});
            }
        } catch (error) {
            return res.status(500).json({message: error.message});  
        }
    }

    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id } = req.params;
            const { nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            var arquivo = null;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(nome)) {
                return res.status(400).json({message: 'Nome é campo requerido' });
            } 
            if(req.files && Object.keys(req.files).length > 0) { 
                arquivo = req.files.arquivo;
            }          
            const documentoCreated = await Documento.criar(esportista.id, nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            const movDocCreated = await MovimentacaoDocumento.criar(
                esportista.id, movimentacao_id, documentoCreated.id
            ); 
            const movimentacao = await movDocCreated.getMovimentacao();
            const documento = await movDocCreated.getDocumentoSemConteudo();
            return res.status(201).json(
                {   
                    id: movDocCreated.id, 
                    movimentacao_id : movDocCreated.movimentacao_id,
                    documento_id : movDocCreated.documento_id, 
                    movimentacao,
                    documento
                }
            );
        } catch (error) {
            return res.status(500).json({message: error.message});
        }
    } 

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id, documento_id } = req.params; 
            const novosDados = req.body;
            var arquivo = null;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }  
            if(req.files && Object.keys(req.files).length > 0) { 
                arquivo = req.files.arquivo;
            }               
            const movDoc = await MovimentacaoDocumento.busca(esportista.id, movimentacao_id, documento_id);
            if(!movDoc) {
                return res.status(404).json({message: `Documento ID ${documento_id} não existe`});
            } 
            let documento = await Documento.buscaPorId(esportista.id, movDoc.documento_id, false);
            if(documento) { 
                const documentoAtualizado = await Documento.atualizar(esportista.id, documento.id, novosDados, arquivo);
                return res.status(200).json(documentoAtualizado);
            } else {
                return res.status(404).json({ message: `Documento ID ${documento_id} não existe` });
            }                                           
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }

    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const movDoc = await MovimentacaoDocumento.busca(esportista.id, movimentacao_id, documento_id);
            if(!movDoc) {
                return res.status(404).json({message: `Documento ID ${documento_id} não existe`});
            }    
            let documento = await Documento.buscaPorId(esportista.id, movDoc.documento_id, true);
            if(documento && documento.arquivo) { 
                return res.status(200).download(documento.arquivo, documento.arquivoNome, (error) => {
                    if(error) {
                        console.log(error);
                    }
                    if(res.headersSent) {
                        Documento.apagaArquivoTemporario(documento.arquivo);
                    }
                }); 
            } else {
                return res.status(404).json({ message: `Documento ID ${documento_id} não encontrado` });
            }                    
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }   
    
    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { movimentacao_id, documento_id } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const excluiu = await MovimentacaoDocumento.exclui(esportista.id, movimentacao_id, documento_id);  
            if(excluiu) {
                return res.status(200).json({message: `Documento ID ${documento_id} foi excluído com sucesso`});
            } else {
                return res.status(404).json({message: `Documento ID ${documento_id} não existe`});
            }
        } catch (error) {
            return res.status(500).json( {message: error.message});  
        }
    }    
}

module.exports = MovimentacaoDocumentoController;