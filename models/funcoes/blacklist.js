const jwt =  require('jsonwebtoken');
const { createHash } = require('crypto');

const KEY = process.env.TOKEN_KEY;
const db = require('../../models');

class Blacklist {
    /**
     * @param string id 
     * @param [] 
     * @returns string
     */
    static criaTokenJWT(id, [tempo, unidade]) {
        const payLoad = { id };
        const token = jwt.sign(payLoad, KEY, { expiresIn : tempo + unidade});
        return token;
    }

    /**
     * @param string caracteres 
     * @returns string
     */
    static geraHash(caracteres) {
        return createHash('sha256').update(caracteres).digest('hex');
    }

    /**
     * @param string token 
     * @returns Blaklist
     */
    static async invalidaTokenJWT(token) {
        const chave = Blacklist.geraHash(token);
        const expiracao = jwt.decode(token).exp;
        const novoRegistro = await db.Blacklist.create({ chave, expiracao });
        return novoRegistro;
    }    

    /**
     * Não se encontra na Blacklist e pode ser verificado
     * @param string token 
     * @param string nome 
     * @returns string
     * @throws JsonWebTokenError 
     */
    static async verificaTokenJWT(token, nome) {
        const tokenHash = Blacklist.geraHash(token);
        const contem = await db.Blacklist.findOne({ where: { chave: tokenHash } });
        if(contem) {
            throw new jwt.JsonWebTokenError(`${nome} token invalidado por logout`);
        }
        const { id } = jwt.verify(token, KEY);  
        return id;  
    }    
};

module.exports = Blacklist;