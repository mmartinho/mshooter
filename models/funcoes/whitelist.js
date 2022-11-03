const moment = require('moment');
const crypto = require('crypto');
const db = require('../../models');
const InvalidArgumentError = require('../../shared/errors/invalid-argument');

class Whitelist {
    /**
     * @param []  
     * @returns string
     */
    static async criaTokenOpaco(id, [tempo, unidade]) {
        const chave = crypto.randomBytes(24).toString('hex');
        const expiracao = moment().add(tempo, unidade).unix();
        const novoRegistro = await db.Whitelist.create({ user_id : id, chave, expiracao });
        return novoRegistro.chave;
    }  
    
    /**
     * @param string chave 
     * @param string nome 
     * @returns Whitelist
     * @throws Error
     */
    static async verificaTokenOpaco(chave, nome) {
        if(!chave) {
            throw new InvalidArgumentError(`${nome} token não enviado`);
        }
        const encontrado = await db.Whitelist.findOne({ where: { chave } });
        if(!encontrado) {
            throw new InvalidArgumentError(`${nome} token inválido`);
        }
        return encontrado.user_id;  
    }; 
    
    /**
     * @param string chave 
     */
    static async invalidaTokenOpaco(chave) {
        await db.Whitelist.destroy({ where: { chave } });
    }    
};

module.exports = Whitelist;