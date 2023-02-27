const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Registro = require('../models/funcoes/registro');
const tipoRegistro = require('../models/types/registro-tipo');

class DocumentoRegistroController extends CRUDController {
    static async cria(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { dt_registro, atividades, tipo, nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!(dt_validade)) {
                return res.status(400).json({message: 'Data de validade é campo requerido'});
            }
            if(!(tipo)) {
                return res.status(400).json({message: 'Tipo é campos requerido'});
            }
            if(!(nome && numero)) {
                return res.status(400).json({message: 'Nome e número são campos requeridos'});
            } 
            if(!req.files || Object.keys(req.files).length === 0) { 
                return res.status(400).json({message: 'Nenhum arquivo foi enviado'});
            }
            if(await Registro.existe(esportista.id, numero, tipo, dt_validade)) {
                return res.status(409).json({
                    message: 
                        `Registro de ${tipoRegistro.toDescription(Number(tipo))} número ${numero} `+
                        `com data de validade ${dt_validade} já existe`
                });  
            }
            arquivo = req.files.arquivo;  
            const documentoCreated = await Documento.criar(esportista.id, nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            const registroCreated = await Registro.criar(esportista.id, documentoCreated.id, dt_registro, atividades, tipo); 
            const documento = await registroCreated.getDocumentoSemConteudo();
            return res.status(201).json({registroCreated, documento});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    } 

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { documento_id } = req.params;
            const { dt_registro, atividades, tipo } = req.body;
            const { nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            let dadosDocumento = {}; let dadosRegistro = {};
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            if(req.files && Object.keys(req.files).length > 0) {arquivo = req.files.arquivo;}
            if(nome) {dadosDocumento.nome = nome;}
            if(descricao) {dadosDocumento.descricao = descricao;}
            if(numero) {dadosDocumento.numero = numero;}
            if(dt_expedicao) {dadosDocumento.dt_expedicao = dt_expedicao;}
            if(dt_validade) {dadosDocumento.dt_validade = dt_validade;}
            const documento = await Documento.atualizar(esportista.id, documento_id, dadosDocumento, arquivo);
            if(documento) {
                if(dt_registro) {dadosRegistro.dt_registro = dt_registro;}
                if(atividades) {dadosRegistro.atividades = atividades;}
                if(tipo) {dadosRegistro.tipo = tipo;}
                const registro = await Registro.atualizar(esportista.id, documento_id, dadosRegistro);
                return res.status(200).json({registro, documento});    
            } else {
                return res.status(404).json({message: `Documento ID ${documento_id} não encontrado`});    
            }
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }    

    static async listaTodos(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { limit, offset } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }         
            const documentosRegistro = await Registro.lista(esportista.id, limit, offset);
            return res.status(200).json(documentosRegistro);
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    } 
    
    static async visualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            } 
            const registro = await Registro.buscaPorId(esportista.id, documento_id, false);         
            if(registro) {
                return res.status(200).json(registro);    
            } else {
                return res.status(404).json({message: `Documento de Registro ID ${documento_id} não encontrado`});    
            }
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }  
    
    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const excluiu = await Documento.excluir(esportista.id, documento_id);
            if(excluiu)
                return res.status(200).json({message: `Documento de Registro ID ${documento_id} excluído com sucesso`});
            else 
                return res.status(404).json({message: `Documento de Registro ID ${documento_id} não encontrado`});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }    

    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }             
            let documento = await Documento.buscaPorId(esportista.id, documento_id, true);
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
                return res.status(404).json({ message: `Documento de Registro ID ${documento_id} não encontrado` });
            }                    
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }   
}

module.exports = DocumentoRegistroController;