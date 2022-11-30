const jwt =  require('jsonwebtoken');
const { createHash } = require('crypto');
const db = require('../../models');

class Blacklist {
    /**
     * @param string id 
     * @param [] 
     * @returns string
     */
    static criaTokenJWT(id, [tempo, unidade]) {
        const payLoad = { id };
        const token = jwt.sign(payLoad, process.env.TOKEN_KEY, { expiresIn : tempo + unidade});
        return token;
    }

    /**
     * @param string caracteres 
     * @returns string
     */
    static geraHash(caracteres) {
        if(caracteres) {
            return createHash('sha256').update(caracteres).digest('hex');
        } else {
            return null;
        }
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
        if(!tokenHash) {
           throw new jwt.JsonWebTokenError(`Token Bearer não enviado`); 
        }
        const contem = await db.Blacklist.findOne({ where: { chave: tokenHash } });
        if(contem) {
            throw new jwt.JsonWebTokenError(`${nome} token invalidado por logout`);
        }
        const { id } = jwt.verify(token, process.env.TOKEN_KEY);  
        return id;  
    }    
};

module.exports = Blacklist;