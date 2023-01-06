const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const InsumoMovimentacaoDocumento = require('../models/funcoes/insumo-movimentacao-documento');

class DocumentoInsumoMovimentacaoController extends CRUDController {
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumomovimentacao_id, limit, offset } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const lista = await InsumoMovimentacaoDocumento.lista(esportista.id, insumomovimentacao_id, limit, offset);  
            return res.status(200).json(lista);          
        } catch (error) {
            return res.status(500).json( {message: error.message});  
        }
    }

    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumomovimentacao_id, documento_id } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const documento = await InsumoMovimentacaoDocumento.mostra(esportista.id, insumomovimentacao_id, documento_id);  
            return res.status(200).json(documento);          
        } catch (error) {
            return res.status(500).json( {message: error.message});  
        }
    }

    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumomovimentacao_id } = req.params;
            const { nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(nome)) {
                return res.status(400).json({message: 'Nome é campo requerido' });
            } 
            if(!req.files || Object.keys(req.files).length === 0) { 
                return res.status(400).json({message: 'Nenhum arquivo foi enviado'});
            }
            arquivo = req.files.arquivo;            
            const documentoCreated = await Documento.criar(nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            const insumoMovimentacaoDocumentoCreated = await InsumoMovimentacaoDocumento.criar(
                esportista.id, insumomovimentacao_id, documentoCreated.id
            ); 
            const insumoMovimentacao = await insumoMovimentacaoDocumentoCreated.getInsumoMovimentacao();
            const documento = await insumoMovimentacaoDocumentoCreated.getDocumentoSemConteudo();
            return res.status(201).json(
                {insumoMovimentacaoDocumentoCreated, insumoMovimentacao, documento}
            );
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    } 

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumomovimentacao_id, documento_id } = req.params; 
            const novosDados = req.body;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const insumoMovimentacaoDocumento = await InsumoMovimentacaoDocumento.busca(esportista.id, insumomovimentacao_id, documento_id);
            if(!insumoMovimentacaoDocumento) {
                return res.status(404).json({
                    message: 
                        `Registro de Documento de Movimentacao de Insumo feita pelo esportista ${esportista.nome} ` +
                        `do sobre a a movimentação ID ${insumomovimentacao_id} com documento ID ${documento_id} não existe`
                });
            } 
            let documento = await Documento.buscaPorId(insumoMovimentacaoDocumento.documento_id, false);
            if(documento) { 
                const documentoAtualizado = await Documento.atualizar(documento.id, novosDados);
                return res.status(200).json(documentoAtualizado);
            } else {
                return res.status(404).json({ message: `Documento ID ${documento_id} não encontrado` });
            }                                           
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }

    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { insumomovimentacao_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const insumoMovimentacaoDocumento = await InsumoMovimentacaoDocumento.busca(esportista.id, insumomovimentacao_id, documento_id);
            if(!insumoMovimentacaoDocumento) {
                return res.status(404).json({
                    message: 
                        `Registro de Documento de Movimentacao de Insumo feita pelo esportista ${esportista.nome} ` +
                        `do sobre a a movimentação ID ${insumomovimentacao_id} com documento ID ${documento_id} não existe`
                });
            }    
            let documento = await Documento.buscaPorId(insumoMovimentacaoDocumento.documento_id, true);
            if(documento) { 
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
            const { insumomovimentacao_id, documento_id } = req.params; 
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const excluiu = await InsumoMovimentacaoDocumento.exclui(esportista.id, insumomovimentacao_id, documento_id);  
            if(excluiu) {
                return res.status(200).json({message: `Documento ID ${documento_id} foi excluído com sucesso`});
            } else {
                return res.status(404).json({message: `Documento ID ${documento_id} não foi encontrado`});
            }
        } catch (error) {
            return res.status(500).json( {message: error.message});  
        }
    }    
}

module.exports = DocumentoInsumoMovimentacaoController;