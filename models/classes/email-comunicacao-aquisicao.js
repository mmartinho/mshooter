/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe que representa uma mensagem de e-mail voltada para comunicação 
 *          de movimentação de aquisição de Insumo e/ou Munição.
 *          O corpo da mensagem utiliza gabarito PUG disponibilizado em
 *          @see shared\templates
 ************************************************************************************/
const pug = require('pug');
const Email = require('./email');
const path = __basedir + `/${process.env.TEMPLATES_DIR}/`;
const { convert } = require('html-to-text');

class EmailComunicacaoAquisicao extends Email {
    constructor(esportista, identificacao, registro, fornecedores, produtos, orgao, arquivos=[]) {
        super();
        this.from = esportista.email;
        this.to = orgao.email;
        this.subject = `Comunicação de Aquisição de Munição(ões) e/ou Insumo(s) - Art 72 Portaria 136/2019 COLOG`;
        const params = {   
            esportista_nome : esportista.nome,
            identificacao_numero: identificacao.numero,
            identificacao_nome: identificacao.nome,
            registro_atividades: registro.atividades,
            registro_nome: registro.nome,
            registro_numero: registro.numero,
            esportista_endereco: esportista.endereco,
            produtos,
            fornecedores
        };
        this.html = pug.renderFile(path+'email-comunicacao-aquisicao.pug', params);
        this.text = convert(this.html, {wordwrap:130});
        if(arquivos.length > 0) {this.attachments = arquivos;}
    }
}

module.exports = EmailComunicacaoAquisicao;