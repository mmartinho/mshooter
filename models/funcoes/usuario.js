const bcrypt = require('bcryptjs');
const db = require('../../models');
const Auxiliar = require('../../shared/functions/auxiliar');
const InvalidArgumentError = require('../../shared/errors/invalid-argument');
const UserNotFoundError = require('../../shared/errors/user-not-found');

class Usuario {
    /**
     * @param string email 
     * @returns Usuario | null
     */
    static async buscaPorEmail(email) {
        const usuario = await db.Usuario.findOne({ where: { email } });
        if(!usuario) {
            return null;
        }
        return usuario;    
    }

    /**
     * @param Number id 
     * @returns Usuario | null
     */
    static async buscaPorId(id) {
        const usuario = await db.Usuario.findOne({ where: { id } });
        if(!usuario) {
            return null
        }
        return usuario;         
    }

    /**
     * @param Usuario usuario 
     * @returns boolean
     */
    static async emailVerificado(usuario) {
        return usuario.verificado === 1;
    }

    /**
     * @param string email 
     * @returns boolean
     */
    static async existe(email) {
        const existe = await Usuario.buscaPorEmail(email);
        if(existe) {
            return true;
        } else {
            return false;
        }   
    }    

    /**
     * @param string senha 
     * @param string senhaHash
     */
    static async verificaSenha(senha, senhaHash) {
        const senhaValida = await bcrypt.compare(senha, senhaHash);
        if(!senhaValida) {
            return false;
        }
        return true;
    }  
    
    /**
     * @param string nome 
     * @param string email 
     * @param string senha 
     * @returns Usuario
     * @throws Error
     */
    static async criar(nome, email, senha) {
        var userCreated = null;
        const encryptedPass = await bcrypt.hash(senha, 10);
        await db.Usuario.create({ nome, email: email.toLowerCase(), senha: encryptedPass})
            .then(user => {
                userCreated = user;
            }).catch(error => {
                throw new Error(`N??o poss??vel criar usu??rio ${email}. ${error.message}`);
            });
        return userCreated;
    } 
    
    /**
     * @param {*} novosDados 
     * @param integer id 
     * @returns Usuario
     * @throws Error
     */
    static async atualizar(novosDados, id) {
        var affected = [];
        if(Auxiliar.isEmpty(novosDados)) {
            throw new InvalidArgumentError(`N??o foi enviada nenhuma informa????o para ser alterada de Usu??rio id ${id}`);
        }
        await db.Usuario.update(novosDados, { where: { id : Number(id) } })
            .then(result => { 
                affected = result; 
            })
            .catch(error => {
                throw new Error(`N??o foi poss??vel atualizar usu??rio id ${id}. ${error.message}`);
            });  
        if(affected[0] == 1) {
            const userUpdated = await db.Usuario.findOne({ where: { id } });   
            return userUpdated;
        } else {
            throw new UserNotFoundError(`Usu??rio de id ${id} n??o foi encontrado`);
        }
    }    

    /**
     * @param integer id
     * @returns integer
     * @throws Error
     */
     static async excluir(id) {
        var affected = 0;
        await db.Usuario.destroy({ where: { id: Number(id) } })
            .then(result => {
                affected = result;
            })
            .catch(error => {
                throw new Error(`N??o foi poss??vel excluir usu??rio de id ${id}. ${error.message}`);
            }); 
        if(affected > 0) {
            return id;
        } else {
            throw new UserNotFoundError(`Usu??rio de id ${id} n??o foi encontrado`);
        }  
    } 
    
    /**
     * @param Number id 
     * @returns 
     */
    static async verifica(id) {
        var affected = [];
        await db.Usuario.update({verificado: true}, { where: { id: Number(id) } })
            .then(result => { 
                affected = result; 
            })
            .catch(error => {
                throw new Error(`N??o foi poss??vel verificar usu??rio id ${id}. ${error.message}`);
            });
        if(affected[0] == 1) {
            const userVerified = await db.Usuario.findOne({ where: { id: Number(id) } });   
            return userVerified;
        } else {
            throw new UserNotFoundError(`Usu??rio de id ${id} n??o foi encontrado`);
        }             
    }

}

module.exports = Usuario;
