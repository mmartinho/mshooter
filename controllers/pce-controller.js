const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Compra = require('../models/funcoes/compra');
const pceDoEsportista = require('../models/funcoes/pce');

class PCEController extends CRUDController{
    static async listAll(req, res) {
        const esportista = req.esportista; // vem do middleware
        if(esportista) {
            try {
                const lista = await pceDoEsportista.lista(esportista.id);
                return res.status(200).json(lista);
            } catch (error) {
                return res.status(500).json({ message: error.message }); 
            }            
        } 
        return super.listAll(req, res); // se adm   
    }

    static async singleObject(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        if(esportista) {
            try {
                const item = await pceDoEsportista.item(id, esportista.id);
                return res.status(200).json(item);
            } catch (error) {
                return res.status(500).json({ message: error.message }); 
            }            
        } 
        return super.singleObject(req, res);  // se adm       
    }

    static async cria(req, res) {
        const esportista = req.esportista; // vem do middleware
        const dados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        try {
            const itemCriado = await pceDoEsportista.criaItem(esportista.id, dados);
            return res.status(201).json(itemCriado);
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }
    }

    static async atualiza(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        const novosDados = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }
        try {
            const itemAtualizado = await pceDoEsportista.atualizaItem(id, esportista.id, novosDados);
            if(!itemAtualizado) {
                return res.status(404).json({message: `Pce ID ${id} pertencente ao Esportista '${esportista.nome}' não foi encontrado`});
            }
            return res.status(200).json(itemAtualizado);
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }            
    }    

    static async exclui(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { id } = req.params;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} não é um esportista`});
        }    
        try {
            await pceDoEsportista.excluiItem(id, esportista.id);
            return res.status(200).json({ message : `PCE ID ${id} pertencente ao Esportista '${esportista.nome}' foi excluído com sucesso`});
        } catch (error) {
            return res.status(500).json({ message: error.message }); 
        }       
    }       

    static async criaDocumentoCompra(req, res) {
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

    static async atualizaDocumentoCompra(req, res) {
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

    static async listaTodosDocumentoCompra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { pce_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }         
            const documentosCompra = await Compra.lista(esportista.id, pce_id);
            return res.status(200).json(documentosCompra);
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    } 
    
    static async visualizaDocumentoCompra(req, res) {
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
    
    static async excluiDocumentoCompra(req, res) {
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

    static async downloadDocumentoCompra(req, res) {
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

module.exports = PCEController;