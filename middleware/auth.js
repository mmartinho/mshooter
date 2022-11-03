const passport = require('passport');
const tokens = require('./tokens');
const Usuario = require('../models/funcoes/usuario');
const UserUnauthorizedError = require('../shared/errors/user-unauthorized');

class AuthMiddleware {
    static local(req, res, next) {
        passport.authenticate('local', { session: false }, (error, usuario, info) => {
            if(!usuario && !error) {
                return res.status(401).json({message: 'Não foi possível autorizar requisição por método local'});
            }
            if(error && error.name === 'InvalidArgument') {
                return res.status(401).json({message: error.message});
            }
            if(error && error.name === 'UserNotFound') {
                return res.status(404).json({message: error.message});
            } 
            if(error && error.name === 'InvalidUserOrPassword') {
                return res.status(401).json({message: error.message});
            }                        
            if(error) {
                return res.status(500).json({message: error.message});
            }
            req.user = usuario;
            return next();
        })(req, res, next)
    }

    static bearer(req, res, next) {
        passport.authenticate('bearer', {session: false}, async (error, usuario, info) => {
            if(!usuario && !error) {
                return res.status(401).json({message: 'Não foi possível autorizar requisição por método bearer'});
            } 
            if(error && error.name === 'JsonWebTokenError') {
                return res.status(401).json({message: error.message});
            }
            if(error && error.name === 'TokenExpiredError') {
               return res.status(401).json({message: `${error.message} at ${error.expiredAt}`}); 
            }
            if(error) {
                return res.status(500).json({message: error.message});
            }  
            req.token = info.token;
            req.user = usuario; 
            req.esportista = await usuario.getEsportista();
            req.administrador = usuario.administrador ? usuario : null;
            if(!req.esportista && !req.administrador) {
                const usuarioNaoAutorizado = new UserUnauthorizedError();
                return res.status(401).json({message: usuarioNaoAutorizado.message}); 
            }
            return next();
        }
        )(req, res, next)
    }

    static async refresh(req, res, next) {
        try {
            const { refreshToken } = req.body;
            const id = await tokens.refresh.verifica(refreshToken);
            await tokens.refresh.invalida(refreshToken);
            req.user = await Usuario.buscaPorId(id);
            return next();            
        } catch (error) {
            if(error.name === 'InvalidArgument') {
                return res.status(401).json({message: error.message});
            }
            return res.status(500).json({message: error.message});
        }
    }

    static async verificacaoEmail(req, res, next) {
        try {
            const { token } = req.params;
            const id = await tokens.verificacaoEmail.verifica(token);
            const usuario = await Usuario.buscaPorId(id);
            req.user = usuario;
            return next();
        } catch (error) {
            if(error.name === 'JsonWebTokenError') {
                return res.status(401).json({message: error.message});     
            }
            if(error.name === 'TokenExpiredError') {
                return res.status(401).json({message: `${error.message} at ${error.expiredAt}`});     
            }            
            return res.status(500).json({message: error.message});
        }
    }

}

module.exports = AuthMiddleware;