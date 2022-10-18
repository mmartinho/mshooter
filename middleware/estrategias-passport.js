const passport = require('passport');
const { verifica } = require('../controllers/usuario-controller');

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Usuario = require('../models/funcoes/usuario');
const tokens = require('./tokens');

passport.use(
    new LocalStrategy(
        {
            usernameField: 'email',
            passwordField: 'senha',
            session: false
        }, 
        async (email, senha, done) => {
            try {
                const usuario = await Usuario.buscaPorEmail(email); 
                if(!usuario) {
                    throw new Error(`Usuário com e-mail ${email} não encontrado`);
                }
                const senhaOk = await Usuario.verificaSenha(senha, usuario.senha); 
                if(!senhaOk) {
                    throw new Error(`Usuário ou senha inválidos`);  
                }
                if(!usuario.verificado) {
                    throw new Error(`Usuário não verificou seu email, portanto, não pode logar neste momento`);
                }
                done(null, usuario);  
            } catch (error) {
                done(error);   
            }
        }
    )
);

passport.use(
    new BearerStrategy(
        async (token, done) => {
            try{
                const id = await tokens.access.verifica(token);
                const usuario = await Usuario.buscaPorId(id);
                if(!usuario) {
                    throw new Error(`Usuário com ${id} não encontrado`);  
                }
                done(null, usuario, {token: token});
            } catch (error) {
                done(error);
            }
        }
    )
);