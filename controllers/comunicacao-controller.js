const CRUDController = require('./crud-controller');
const Comunicacao = require('../models/funcoes/comunicacao');
const EmailComunicacaoAquisicao = require('../models/classes/email-comunicacao-aquisicao');
const Documento = require('../models/funcoes/documento');
const Registro = require('../models/funcoes/registro');
const Movimentacao = require('../models/funcoes/movimentacao');
const Attachment = require('../models/classes/attachment');
const tipoMovimentacao = require('../models/types/movimentacao-tipo');
const tipoRegistro = require('../models/types/registro-tipo');
const tipoLocal = require('../models/types/local-tipo');
const localDoEsportista = require('../models/funcoes/local');

/**
 * Lista dos produtos adquiridos em "dt_movimentacao"
 * 
 * @param integer esportista_id
 * @param string dt_movimentacao
 * @param integer comunicacao_id
 * @returns []
 */
async function produtosAdquiridos(esportista_id, dt_movimentacao) {
    let produtos=[]; var produto=''; var insumo=null; var municao=null;
    const movimentacoes = await Movimentacao.lista(esportista_id, 
        null, null, null, null, null, null, false, 
        dt_movimentacao, [tipoMovimentacao.aquisicao.value], false
    );
    for(var i=0; i<movimentacoes.length; i++) {
        if(!(movimentacoes[i].comunicacao_id)) {
            if(movimentacoes[i].insumo_id) {
                insumo = await movimentacoes[i].getInsumo();
                produto = `${movimentacoes[i].quantidade} de ${insumo.nome}`;
            }
            if(movimentacoes[i].municao_id) {
                municao = await movimentacoes[i].getMunicao();
                produto = `${movimentacoes[i].quantidade} de ${municao.nome}`;
            }
            if(!movimentacoes[i].insumo_id && !movimentacoes[i].municao_id) {
                produto = null
            }
            produtos.push(produto); 
        }      
    }
    return produtos;
}

/**
 * Lista de todos os fornecedores de produtos adquiridos
 * 
 * @param integer esportista_id 
 * @param string dt_movimentacao 
 * @returns []
 */
async function fornecedoresProdutosAdquiridos(esportista_id, dt_movimentacao) {
    let fornecedores=[]; var fornecedor=null; var local=null;
    const movimentacoes = await Movimentacao.lista(esportista_id, 
        null, null, null, null, null, null, false, 
        dt_movimentacao, [tipoMovimentacao.aquisicao.value], false
    ); 
    for(var i=0; i<movimentacoes.length; i++) {   
        if(movimentacoes[i].local_id) {
            local = await movimentacoes[i].getLocal();
            fornecedor = `${local.nome}, cnpj: ${local.cnpj} ie: ${local.ie}, endereco: ${local.endereco}`;  
        } else { 
            fornecedor = null;
        }
        if(fornecedor && fornecedores.filter(e => e == fornecedor).length == 0) {
            fornecedores.push(fornecedor);
        }
    }
    return fornecedores;
}

/**
 * Associa as movimenta????es ocorridas em "dt_movimencacao" 
 * com o objeto de comuni????o de aquisi????o
 * 
 * @param integer esportista_id 
 * @param string dt_movimentacao 
 * @param integer comunicacao_id  
 */
async function comunicacaoMovimentacoes(esportista_id, dt_movimentacao, comunicacao_id) {
    const movimentacoes = await Movimentacao.lista(esportista_id, 
        null, null, null, null, null, null, false, 
        dt_movimentacao, [tipoMovimentacao.aquisicao.value], false
    );  
    for(var i=0; i<movimentacoes.length; i++) {    
        await Movimentacao.alterar(esportista_id, null, null, null, null, movimentacoes[i].id, {
            comunicacao_id: Number(comunicacao_id)
        }); 
    }
}

/**
 * Retorna os arquivos dos documentos de aquisi????o de produtos 
 * que ser??o anexados para envio em email 
 * 
 * @param integer esportista_id 
 * @param string dt_movimentacao 
 */
async function arquivosProdutosAdquiridos(esportista_id, dt_movimentacao) {
    let arquivos=[]; var movimentacaoDocumento=[]; var documento=null; var arquivo=null;
    const movimentacoes = await Movimentacao.lista(esportista_id, 
        null, null, null, null, null, null, false, 
        dt_movimentacao, [tipoMovimentacao.aquisicao.value], false
    );
    for(var i=0; i<movimentacoes.length; i++) {
        movimentacaoDocumento = await movimentacoes[i].getMovimentacaoDocumento();
        for(var j=0; j<movimentacaoDocumento.length; j++) {
            documento = await Documento.buscaPorId(esportista_id, movimentacaoDocumento[j].documento_id, true);
            if(documento && documento.arquivoNome && documento.arquivo && arquivos.filter(e => e.filename == documento.arquivoNome).length == 0) {
                arquivo = new Attachment(documento.arquivoNome, null, documento.arquivo);
                arquivo.temp = documento.arquivo;
                arquivos.push(arquivo);
            }
        }        
    }
    return arquivos;
}

/**
 * Seleciona o primeiro Documento de Identifica????o do Esportista
 * 
 * @param integer esportista_id 
 * @returns {*} | null 
 */
async function algumaIdentificacao(esportista_id) {
    let identificacao=null;
    const identificadores = tipoRegistro.identificadores();
    for(var i=0; i<identificadores.length; i++) {
        identificacao = await Registro.buscaPorCampos(esportista_id, identificadores[i]);
        if(identificacao) {
            return identificacao;
        }
    }
    return identificacao;
}

/**
 * Endere??o do primeiro Local de Guarda do Esportista
 * 
 * @param integer esportista_id 
 * @returns string | null
 */
async function algumLocalGuarda(esportista_id) {
    const locais = await localDoEsportista.listaPorCampos(esportista_id, tipoLocal.localGuarda.value);
    if(locais.length > 0) {
        return `${locais[0].nome} - ${locais[0].endereco}`;
    } else {
        return null;
    }
}

class ComunicacaoController extends CRUDController {
    static async comunica(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { dt_movimentacao, orgao } = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} n??o ?? um esportista`});
        }
        if(!dt_movimentacao) {
            return res.status(401).json({message : `Data da(s) movimenta????o(??es) ?? campo requerido`});
        }
        if(orgao && orgao.email && orgao.nome) {
            try {
                const identificacao = await algumaIdentificacao(esportista.id);
                if(!identificacao) {
                    return res.status(409).json({message: `Documento de identifica????o do desportista inexistente`});
                }
                const registro = await Registro.buscaPorCampos(esportista.id, tipoRegistro.cr.value);
                if(!registro) {
                    return res.status(409).json({message: `Documento de registro do desportista inexistente`});
                }
                esportista.email = req.user.email;
                esportista.endereco = await algumLocalGuarda(esportista.id);
                if(!esportista.endereco) {
                    return res.status(409).json({message: `Endere??o de Local de Guarda do desportista inexistente`}); 
                }                
                const produtos = await produtosAdquiridos(esportista.id, dt_movimentacao);
                if(produtos.length == 0 ) {
                    return res.status(409).json({message: `N??o existem produtos adquiridos em ${dt_movimentacao} que n??o foram comunicados`});
                }                
                const arquivos = await arquivosProdutosAdquiridos(esportista.id, dt_movimentacao);
                if(arquivos.length == 0) {
                    return res.status(409).json({message: `Nenhum Documento de aquisi????o encontrado`}); 
                }
                const fornecedores = await fornecedoresProdutosAdquiridos(esportista.id, dt_movimentacao);
                if(fornecedores.length == 0) {
                    return res.status(409).json({message: `Fornecedor(es) de produto(s) adquirido(s) n??o encontrado(s)`});
                }                
                const email = new EmailComunicacaoAquisicao(esportista, identificacao, registro, fornecedores, produtos, orgao, arquivos);
                const detalhes = `Mensagem de email enviada para ${email.to}, com seguinte conte??do: ${email.text}`;
                const comunicacao = await Comunicacao.criar(esportista.id, {nome: orgao.nome, email: orgao.email, observacao: detalhes});
                await comunicacaoMovimentacoes(esportista.id, dt_movimentacao, comunicacao.id);
                email.enviaEmail().finally(()=>{arquivos.forEach(attach=>{Documento.apagaArquivoTemporario(attach.temp);})});
                return res.status(200).json({message: detalhes}); 
            } catch (error) {
                return res.status(500).json({message: error.message}); 
            } 
        } else {
            return res.status(401).json({message : `E-mail e nome do ??rg??o destino s??o campos requeridos`}); 
        }       
    }

    static async atualiza(req, res) {
        const esportista = req.esportista; // vem do middleware
        const { comunicacao_id } = req.params;
        const { protocolo } = req.body;
        if(!esportista) {
            return res.status(401).json({message : `${req.user.nome} n??o ?? um esportista`});
        }
        try {
            const comunicacao = await Comunicacao.atualizar(esportista.id, comunicacao_id, {protocolo});
            if(!comunicacao) {
                return res.status(404).json({message: `Comunica????o ID ${comunicacao_id} n??o encontrada`}); 
            }
            return res.status(200).json(comunicacao); 
        } catch (error) {
            return res.status(500).json({message: error.message}); 
        }        
    }
     
}

module.exports = ComunicacaoController;