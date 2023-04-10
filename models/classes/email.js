/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classes que instanciam, configuram e enviam mensagens de e-mail.
 *          Utilizada pela verificação de identidade do Usuário e Comunicação de 
 *          Movimentação de aquisição de Insumo e/ou Munição.
 *          @see models\classes\email-comunicacao-aquisicao.js
 *          @see models\classes\email-verificacao.js
 ************************************************************************************/
const nodemailer = require('nodemailer');
const Logging = require('./logging');

/**
 * Classe de uma mensagem de e-mail
 */
class EmailMessage {
    constructor(from, to, subject, text, html) {
        this.from = from;
        this.to = to;
        this.subject = subject;
        this.text = text;
        this.html = html;
    }
}

/**
 * Classe responsável pelas instancias, da 
 * configuração do transporte do envio da mensagem
 */
class Email {
    constructor(from, to, subject, text, html) {
        this.transportador = nodemailer.createTransport(this.criaConfiguracaoEmail());
        this.log = new Logging();
        this.message = new EmailMessage(from, to, subject, text, html);
    }

    criaConfiguracaoEmail() {
        const configuracaoEmailTeste = {
            jsonTransport: true
        };
        const configuracaoEmailProducao = {
            host: process.env.EMAIL_HOST,
            port: process.env.EMAIL_PORT,
            secure: process.env.EMAIL_SECURE == 1 ? true : false,
            ignoreTLS: process.env.EMAIL_IGNORETLS == 1 ? true : false,
            requireTLS: process.env.EMAIL_REQUIRETLS == 1 ? true : false,
            auth: {
                user: process.env.EMAIL_USUARIO,
                pass: process.env.EMAIL_SENHA
            } 
        };   
        if(process.env.NODE_ENV === 'production') {
            return configuracaoEmailProducao;
        } else {
            return configuracaoEmailTeste;
        }
    }     

    async enviaEmail() {
        await this.transportador.sendMail(this.message).then(
            (info) => {
                this.log.write('info', info.envelope);
                this.log.write('info', info.messageId);
                this.log.write('info', info.message);
            },
            (reason) => {
                this.log.write('error', reason);
            }
        ); 
    }
}

module.exports = Email;