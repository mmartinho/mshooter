const nodemailer = require('nodemailer');

class Email {
    criaConfiguracaoEmail() {
        const configuracaoEmailTeste = {
            jsonTransport: true
        };
        const configuracaoEmailProducao = {
           host: process.env.EMAIL_HOST,
           auth: {
            user: process.env.EMAIL_USUARIO,
            pass: process.env.EMAIL_SENHA
           },
           secure: true 
        };   
        if(process.env.NODE_ENV === 'production') {
            return configuracaoEmailProducao;
        } else {
            return configuracaoEmailTeste;
        }
    }     

    async enviaEmail() {
        const transportador = nodemailer.createTransport(this.criaConfiguracaoEmail());
        await transportador.sendMail(this).then(
            (info) => {
                if(process.env.NODE_ENV !== 'production') {
                    console.log(info.envelope);
                    console.log(info.messageId);
                    console.log(info.message);
                }
            },
            (reason) => {
                console.log(reason);
            }
        );
    }
}

class EmailVerificacao extends Email {
    constructor(usuario, endereco){
        super();
        this.from = '"mShooter" <noreply@google.com>';
        this.to = usuario.email;
        this.subject = 'Verificação de e-mail';
        this.text = `Olá! Verifique seu e-mail aqui: ${endereco}`;
        this.html = `<h1>Olá</h1> <p>Verifique seu e-mail <a href="${endereco}">aqui</a></p>`;
    }
}

module.exports = EmailVerificacao;