/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe que representa uma mensagem de e-mail de verificação de identidade
 *          de Usuário auto-cadastrado.
 *          O corpo da mensagem utiliza gabarito PUG
 *          @see shared\templates
 ************************************************************************************/
const pug = require('pug');
const Email = require('./email');
const path = __basedir + `/${process.env.TEMPLATES_DIR}/`;

class EmailVerificacao extends Email {
    constructor(usuario, endereco){
        super();
        this.from = '"mShooter" <noreply@google.com>';
        this.to = usuario.email;
        this.subject = 'Verificação de e-mail';
        this.text = `Olá! Verifique seu e-mail aqui: ${endereco}`;
        this.html = pug.renderFile(path+'email-verificacao.pug',{endereco});
    }
}

module.exports = EmailVerificacao;