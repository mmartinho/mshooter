const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Habitualidade = require('../models/funcoes/habitualidade');
const MunicaoUtilizada = require('../models/funcoes/municao-utilizada');

class DocumentoHabitualidadeController extends CRUDController {
    
    static async envia(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id } = req.params;
            const { nome, descricao, numero, dt_expedicao } = req.body;
            let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            if(!dt_expedicao) {
                return res.status(400).json({message: 'Data de expedição não fornecida'});  
            } 
            if(!req.files || Object.keys(req.files).length === 0) { 
                return res.status(400).json({message: 'Nenhum arquivo foi enviado'});
            }
            arquivo = req.files.arquivo;                   
            const documentoCriado = await Documento.criar(nome, descricao, numero, dt_expedicao, null, arquivo);
            const habitualidadeCriada = await Habitualidade.criar(esportista.id, municaoutilizada_id, documentoCriado.id); 
            const municaoUtilizada = await habitualidadeCriada.getMunicaoUtilizada();
            const documento = await habitualidadeCriada.getDocumentoSemConteudo();
            return res.status(201).json({
                id: habitualidadeCriada.id, 
                municaoUtilizada, 
                documento
            });
        } catch (error) {
            return res.status(500).json({message: error.message});
        }       
    }

    static async associa(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            const habitualidadeCriada = await Habitualidade.criar(esportista.id, municaoutilizada_id, documento_id);
            const municaoUtilizada = await habitualidadeCriada.getMunicaoUtilizada();
            const documento = await habitualidadeCriada.getDocumentoSemConteudo();
            return res.status(201).json({
                id: habitualidadeCriada.id, 
                municaoUtilizada, 
                documento
            });           
        } catch(error) {
            return res.status(500).json({message: error.message});
        }
    }

    static async exclui(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id, habitualidade_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const excluiu = await Habitualidade.excluir(esportista.id, municaoutilizada_id, habitualidade_id);
            if(excluiu) {
                return res.status(200).json({message: `Habitualidade ID ${habitualidade_id} foi excluída com sucesso`});
            } else {
                return res.status(404).json({message: `Habitualidade ID ${habitualidade_id} não foi encontrada`});
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async mostra(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id, habitualidade_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }    
            const habitualidade = await Habitualidade.buscar(esportista.id, municaoutilizada_id, habitualidade_id); 
            if(habitualidade) {
                return res.status(200).json(habitualidade);
            } else {
                return res.status(404).json({message: `Habitualidade ID ${habitualidade_id} não encontrada`});
            }
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async lista(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id, offset, limit } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }
            const habitualidades = await Habitualidade.lista(esportista.id, municaoutilizada_id, limit, offset);
            return res.status(200).json(habitualidades);                        
        } catch(error) {
            return res.status(500).json({message: error.message});
        }        
    } 
    
    static async download(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { municaoutilizada_id, documento_id } = req.params;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }           
            const municaoUtilizada = await MunicaoUtilizada.encontrar(esportista.id, municaoutilizada_id);
            if(!municaoUtilizada) {
                return res.status(404).json({message: `Registro de utilização de munição ID ${municaoutilizada_id} não existe `});
            }    
            let documento = await Documento.buscaPorId(documento_id, true);
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
   
}

module.exports = DocumentoHabitualidadeController;