const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Compra = require('../models/funcoes/compra');

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
            if(await Documento.existe(numero)) {
                return res.status(409).json({message: `Documento número ${numero} já existe`});
            }
            if(!req.files || Object.keys(req.files).length === 0) { 
                return res.status(400).json({message: 'Nenhum arquivo foi enviado'});
            }
            arquivo = req.files.arquivo;            
            const documentoCreated = await Documento.criar(nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            if(await Compra.existe(esportista.id, pce_id, documentoCreated.id)) {
                return res.status(409).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista.nome} ` +
                        `do PCE id ${pce_id} com documento ${documentoCreated.nome} já existe`
                });
            }
            const compraCreated = await Compra.criar(esportista.id, pce_id, documentoCreated.id, documentoCreated.dt_expedicao); 
            const pce = await compraCreated.getPce();
            const documento = await compraCreated.getDocumentoSemConteudo();
            return res.status(201).json({id: compraCreated.id, dt_compra: compraCreated.dt_compra, pce, documento});
        } catch (error) {
            return res.status(500).json( {message: error.message});
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
            const compra = await Compra.busca(esportista.id, pce_id, documento_id);
            if(!compra) {
                return res.status(404).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista.nome} ` +
                        `do PCE ID ${pce_id} com documento ID ${documento_id} não existe`
                });
            }
            if(req.files && Object.keys(req.files).length > 0) { 
                arquivo = req.files.arquivo; 
            }
            const documento = await Documento.atualizar(compra.documento_id, novosDados, arquivo);
            const pce = await compra.getPce();
            return res.status(200).json({id: compra.id, dt_compra: compra.dt_compra, pce, documento});
        } catch (error) {
            return res.status(500).json( {message: error.message});
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
            return res.status(500).json( {message: error.message});
        }
    } 
    
    static async visualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }          
            const compra = await Compra.busca(esportista.id, pce_id, documento_id);
            if(!compra) {
                return res.status(404).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista.nome} ` +
                        `do PCE ID ${pce_id} com documento ID ${documento_id} não existe`
                });
            }
            const documento = await Documento.buscaPorId(compra.documento_id);
            const pce = await compra.getPce();
            return res.status(200).json({id: compra.id, dt_compra: compra.dt_compra, pce, documento});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }  
    
    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const compra = await Compra.busca(esportista.id, pce_id, documento_id);
            if(!compra) {
                return res.status(404).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista.nome} ` +
                        `do PCE ID ${pce_id} com documento ID ${documento_id} não existe`
                });
            }
            await Documento.excluir(compra.documento_id);
            return res.status(200).json({message: `Documento de compra de PCE excluído com sucesso`});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }    

    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const compra = await Compra.busca(esportista.id, pce_id, documento_id);
            if(!compra) {
                return res.status(404).json({
                    message: 
                        `Registro de compra feita pelo esportista ${esportista.nome} ` +
                        `do PCE ID ${pce_id} com documento ID ${documento_id} não existe`
                });
            }    
            let documento = await Documento.buscaPorId(compra.documento_id, true);
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
                return res.status(404).json({ message: `Documento ID ${id} não encontrado` });
            }                    
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }   
}

module.exports = DocumentoCompraController;