const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Compra = require('../models/funcoes/compra');

const resStatus = require('../shared/errors/res-status');
const ObjetoNaoEncontradoError = require('../shared/errors/objeto-nao-encontrado');

/**
 * @param Esportista esportista 
 * @param integer pce_id 
 * @param integer documento_id 
 * @returns Compra
 * @throws Error
 */
async function verificaCompraExiste(esportista, pce_id, documento_id) {
    const compra = await Compra.busca(esportista.id, pce_id, documento_id);
    if(!compra) {
        throw new ObjetoNaoEncontradoError (
            `Registro de compra feita pelo esportista ${esportista.nome} ` +
            `do PCE ID ${pce_id} com documento ID ${documento_id} não existe`
        );
    }
    return compra;
}

class DocumentoCompraController extends CRUDController {
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id } = req.params;
            const { nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(nome && numero)) {
                return res.status(400).json({message: 'Nome e número são campos requeridos' });
            } 
            if(!req.files || Object.keys(req.files).length === 0) { 
                return res.status(400).json({message: 'Nenhum arquivo foi enviado'});
            }
            arquivo = req.files.arquivo;            
            const documentoCreated = await Documento.criar(esportista.id, nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            const compraCreated = await Compra.criar(esportista.id, pce_id, documentoCreated.id, documentoCreated.dt_expedicao); 
            const pce = await compraCreated.getPce();
            const documento = await compraCreated.getDocumentoSemConteudo();
            return res.status(201).json({id: compraCreated.id, dt_compra: compraCreated.dt_compra, pce, documento});
        } catch (error) {
            return resStatus(error, res);
        }
    } 

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            const novosDados = req.body;
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            const compra = await verificaCompraExiste(esportista.id, pce_id, documento_id);
            if(req.files && Object.keys(req.files).length > 0) { 
                arquivo = req.files.arquivo; 
            }
            const documento = await Documento.atualizar(esportista.id, compra.documento_id, novosDados, arquivo);
            if(!documento) {
                return res.status(404).json({message: `Documento ID ${documento_id} não encontrado`});    
            } 
            const pce = await compra.getPce();
            return res.status(200).json({id: compra.id, dt_compra: compra.dt_compra, pce, documento});
        } catch (error) {
            return resStatus(error, res);
        }
    }    

    static async listaTodos(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, limit, offset } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }         
            const documentosCompra = await Compra.lista(esportista.id, pce_id, limit, offset);
            return res.status(200).json(documentosCompra);
        } catch (error) {
            return resStatus(error, res);
        }
    } 
    
    static async visualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }          
            const compra = await verificaCompraExiste(esportista.id, pce_id, documento_id);
            const documento = await Documento.buscaPorId(esportista.id, compra.documento_id);
            if(!documento) {
                return res.status(404).json({message: `Documento ID ${documento_id} não encontrado`});        
            }                 
            const pce = await compra.getPce();
            return res.status(200).json({id: compra.id, dt_compra: compra.dt_compra, pce, documento});
        } catch (error) {
            return resStatus(error, res);
        }
    }  
    
    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const compra = await verificaCompraExiste(esportista.id, pce_id, documento_id);
            const excluiu = await Documento.excluir(esportista.id, compra.documento_id);
            if(excluiu) {
                return res.status(200).json({message: `Documento de compra ID ${documento_id} excluído com sucesso`});
            } else {
                return res.status(404).json({message: `Documento de compra ID ${documento_id} não encontrado`});
            }
        } catch (error) {
            return resStatus(error, res);
        }
    }    

    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const compra = await verificaCompraExiste(esportista.id, pce_id, documento_id);   
            let documento = await Documento.buscaPorId(esportista.id, compra.documento_id, true);
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
            return resStatus(error, res);
        }
    }   
}

module.exports = DocumentoCompraController;