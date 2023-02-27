const Email = require('./email');
const pug = require('pug');
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