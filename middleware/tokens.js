/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Objetos que manipulam cadeias de caracteres do tipo "token" utilizados
 *          pelos Middlewares
 ************************************************************************************/
const blacklist = require('../models/funcoes/blacklist');
const whitelist = require('../models/funcoes/whitelist');

module.exports = {
    access : {
        expiracao : [15, 'm'],
        nome: 'access',
        cria(id) {
            return blacklist.criaTokenJWT(id, this.expiracao);    
        },
        verifica(token) {
            return blacklist.verificaTokenJWT(token, this.nome);    
        },
        invalida(token) {
            return blacklist.invalidaTokenJWT(token);
        }
    },
    refresh : {
        expiracao: [5, 'd'],
        nome: 'refresh',
        cria(id) {
            return whitelist.criaTokenOpaco(id, this.expiracao);
        },
        verifica(token) {
            return whitelist.verificaTokenOpaco(token, this.nome);    
        },
        invalida(token) {
            return whitelist.invalidaTokenOpaco(token);    
        }                
    },
    verificacaoEmail : {
        expiracao : [1, 'h'],
        nome : 'token de verificação de e-mail',
        cria(id) {
            return blacklist.criaTokenJWT(id, this.expiracao);
        }, 
        verifica(token) {
            return blacklist.verificaTokenJWT(token, this.nome);
        }
    }    
}