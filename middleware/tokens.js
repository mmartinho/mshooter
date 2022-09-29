const db = require('../models');
const jwt =  require('jsonwebtoken');
const { createHash } = require('crypto');
const moment = require('moment');
const crypto = require('crypto');

function criaTokenJWT(id, [tempo, unidade]) {
    const payLoad = { id };
    const token = jwt.sign(payLoad, process.env.TOKEN_KEY, { expiresIn : tempo + unidade});
    return token;
}

function geraTokenHash(token) {
    return createHash('sha256').update(token).digest('hex');
}

async function verificaTokenJWT(token, nome) {
    const tokenHash = geraTokenHash(token);
    const contem = await db.Blacklist.findOne({ where: { chave: tokenHash } });
    if(contem) {
        throw new jwt.JsonWebTokenError(`${nome} inválido por logout`);
    }
    const { id } = jwt.verify(token, process.env.TOKEN_KEY);  
    return id;  
}

async function invalidaTokenJWT(token) {
    const chave = geraTokenHash(token);
    const expiracao = jwt.decode(token).exp;
    const novoRegistro = await db.Blacklist.create({ chave, expiracao });
    return novoRegistro;
}

async function criaTokenOpaco([tempo, unidade]) {
    const chave = crypto.randomBytes(24).toString('hex');
    const expiracao = moment().add(tempo, unidade).unix();
    const novoRegistro = await db.Whitelist.create({ chave, expiracao });
    return novoRegistro.chave;
};

async function verificaTokenOpaco(chave, nome) {
    if(!chave) {
        throw new Error(`${nome} token não enviado`)
    }
    const encontrado = await db.Whitelist.findOne({ where: { chave } });
    if(!encontrado) {
        throw new Error(`${nome} token inválido`);
    }
    return encontrado;  
};

async function invalidaTokenOpaco(chave) {
    await db.Whitelist.destroy({ where: { chave } });
}

module.exports = {
    access : {
        expiracao : [15, 'm'],
        nome: 'access',
        cria(id) {
            return criaTokenJWT(id, this.expiracao);    
        },
        verifica(token) {
            return verificaTokenJWT(token, this.nome);    
        },
        invalida(token) {
            return invalidaTokenJWT(token);
        }
    },
    refresh : {
        expiracao: [5, 'd'],
        nome: 'refresh',
        cria() {
            return criaTokenOpaco(this.expiracao);
        },
        verifica(token) {
            return verificaTokenOpaco(token, this.nome);    
        },
        invalida(token) {
            return invalidaTokenOpaco(token);    
        }                
    },
    verificacaoEmail : {
        expiracao : [1, 'h'],
        nome : 'token de verificação de e-mail',
        cria(id) {
            return criaTokenJWT(id, this.expiracao);
        }, 
        verifica(token) {
            return verificaTokenJWT(token, this.nome);
        }
    }    
}