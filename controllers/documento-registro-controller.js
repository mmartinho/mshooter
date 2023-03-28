const CRUDController = require('./crud-controller');
const Documento = require('../models/funcoes/documento');
const Registro = require('../models/funcoes/registro');
const tipoRegistro = require('../models/types/registro-tipo');

const resStatus = require('../shared/errors/res-status');
const ObjetoExistenteError = require('../shared/errors/objeto-existente');

/**
 * @param Esportista esportista 
 * @param string numero 
 * @param integer tipo 
 * @param string dt_validade 
 */
async function verificaRegistroJaCadastrado(esportista, numero, tipo, dt_validade) {
    if(await Registro.existe(esportista.id, numero, tipo, dt_validade)) {
        throw new ObjetoExistenteError(
            `Registro de ${tipoRegistro.toDescription(Number(tipo))} número ${numero} `+
            `com data de validade ${dt_validade} já existe`
        );  
    }
}

/**
 * @param string nome 
 * @param string descricao 
 * @param string numero 
 * @param string dt_expedicao 
 * @param string dt_validade 
 * @returns {*}
 */
function selecionarDadosDocumento(nome=null, descricao=null, numero=null, dt_expedicao=null, dt_validade=null) {
    var dados = {};
    if(nome) {dados.nome = nome;}
    if(descricao) {dados.descricao = descricao;}
    if(numero) {dados.numero = numero;}
    if(dt_expedicao) {dados.dt_expedicao = dt_expedicao;}
    if(dt_validade) {dados.dt_validade = dt_validade;}
    return dados;    
}

/**
 * @param {*} files 
 * @returns {*}
 */
function selecionarArquivo(files) {
    let arquivo=null;
    if(files && Object.keys(files).length > 0) {
        arquivo = files.arquivo;
    }
    return arquivo;
}

/**
 * @param string dt_registro 
 * @param string atividades 
 * @param integer tipo 
 * @returns 
 */
function selecionarDadosRegistro(dt_registro=null, atividades=null, tipo=null) {
    var dados = {};
    if(dt_registro) {dados.dt_registro = dt_registro;}
    if(atividades) {dados.atividades = atividades;}
    if(tipo) {dados.tipo = tipo;}
    return dados;
}

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
            await verificaRegistroJaCadastrado(esportista, numero, tipo, dt_validade);
            arquivo = req.files.arquivo;  
            const documentoCreated = await Documento.criar(esportista.id, nome, descricao, numero, dt_expedicao, dt_validade, arquivo);             
            const registroCreated = await Registro.criar(esportista.id, documentoCreated.id, dt_registro, atividades, tipo); 
            const documento = await registroCreated.getDocumentoSemConteudo();
            return res.status(201).json({registroCreated, documento});
        } catch (error) {
            return resStatus(error, res);
        }
    } 

    static async atualiza(req, res) {
        try {
            const esportista = req.esportista; // vem do middleware
            const { documento_id } = req.params;
            const { dt_registro, atividades, tipo } = req.body;
            const { nome, descricao, numero, dt_expedicao, dt_validade } = req.body;
            let dadosRegistro = {}; let dadosDocumento = {}; let arquivo;
            if(!esportista.id) {
                return res.status(409).json({message : `Usuário logado ${req.user.nome} não é um esportista`});
            }            
            arquivo = selecionarArquivo(req.files);
            dadosDocumento = selecionarDadosDocumento(nome, descricao, numero, dt_expedicao, dt_validade);
            const documento = await Documento.atualizar(esportista.id, documento_id, dadosDocumento, arquivo);
            if(!documento) {
                return res.status(404).json({message: `Documento ID ${documento_id} não encontrado`});    
            } 
            dadosRegistro = selecionarDadosRegistro(dt_registro, atividades, tipo);
            const registro = await Registro.atualizar(esportista.id, documento_id, dadosRegistro);
            if(!registro) {
                return res.status(404).json({message: `Registro associado ao documento ID ${documento_id} não encontrado`}); 
            }
            return res.status(200).json({registro, documento});            
        } catch (error) {
            return resStatus(error, res);
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
            return resStatus(error, res);
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
            if(!registro) {
                return res.status(404).json({message: `Documento de Registro ID ${documento_id} não encontrado`});    
            } 
            return res.status(200).json(registro);
        } catch (error) {
            return resStatus(error, res);
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
            if(excluiu) {
                return res.status(200).json({message: `Documento de Registro ID ${documento_id} excluído com sucesso`});
            } else {
                return res.status(404).json({message: `Documento de Registro ID ${documento_id} não encontrado`});
            }
        } catch (error) {
            return resStatus(error, res);
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
                return res.status(404).json({message: `Documento de Registro ID ${documento_id} não encontrado`});
            }                    
        } catch (error) {
            return resStatus(error, res);
        }
    }
    
    static async tipos(req, res) {   
        try {
            const lista = tipoRegistro.lista()
            return res.status(200).json(lista);                        
        } catch (error) {
            return resStatus(error, res); 
        }         
    }      
}

module.exports = DocumentoRegistroController;