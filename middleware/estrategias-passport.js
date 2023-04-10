/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Definição de Objetos de estratégias de autenticação da biblioteca 
 *          "passport" utilizadas pelos Middlewares
 ************************************************************************************/
const passport = require('passport');

const LocalStrategy = require('passport-local').Strategy;
const BearerStrategy = require('passport-http-bearer').Strategy;

const Usuario = require('../models/funcoes/usuario');
const tokens = require('./tokens');

const UserNotFoundError = require('../shared/errors/user-not-found');
const InvalidUserOrPasswordError = require('../shared/errors/invalid-user-or-password');
const UserNotVerifiedError = require('../shared/errors/user-not-verified');

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
                    throw new UserNotFoundError(`Usuário com e-mail ${email} não encontrado`);;
                }
                const senhaOk = await Usuario.verificaSenha(senha, usuario.senha); 
                if(!senhaOk) { 
                    throw new InvalidUserOrPasswordError(`Usuário ou senha inválidos`);  
                }
                if(!usuario.verificado) {
                    throw new UserNotVerifiedError(`Usuário não verificou seu email, portanto, não pode logar neste momento`);
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
                    throw new UserNotFoundError(`Usuário com ${id} não encontrado`);  
                }
                done(null, usuario, {token: token});
            } catch (error) {
                done(error);
            }
        }
    )
);