const db = require('../models');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const tokens = require('../middleware/tokens');

/**
 * @param Number id 
 * @param string email 
 * @returns Usuario
 */
async function novoTokenUsuario(id, email) {
    const token = jwt.sign({ user_id: id, email}, process.env.TOKEN_KEY, { expiresIn : '2h'});
    const updatedUser = await atualizarUsuario({ token }, id);
    return updatedUser;
}

/**
 * @param {*} novosDados 
 * @param integer id 
 * @returns Usuario
 * @throws Error
 */
async function atualizarUsuario(novosDados, id) {
    var affected = [];
    await db.Usuario.update(novosDados, { where: { id } })
        .then(result => { 
            affected = result; 
        })
        .catch(error => {
            throw new Error(`Não foi possível atualizar usuário id ${id}. ${error.message}`);
        });  
    if(affected[0] == 1) {
        const userUpdated = await db.Usuario.findOne({ where: { id } });   
        return userUpdated;
    } else {
        throw new Error(`Usuário de id ${id} não foi encontrado`);
    }
}

/**
 * @param string email 
 * @returns Usuario | null
 */
async function procuraUsuario(email) {
    const user = await db.Usuario.findOne({ where: { email } });
    return user;    
}

/**
 * @param string email 
 * @returns boolean
 */
async function existeUsuario(email) {
    const existe = await procuraUsuario(email);
    if(existe) {
        return true;
    } else {
        return false;
    }   
}

/**
 * @param string nome 
 * @param string email 
 * @param string senha 
 * @returns Usuario
 */
async function criarUsuario(nome, email, senha) {
    const encryptedPass = await bcrypt.hash(senha, 10);
    const newUser = await db.Usuario.create({ nome, email: email.toLowerCase(), senha: encryptedPass});   
    const userWithNewToken = novoTokenUsuario(newUser.id, email);   
    return userWithNewToken;  
}

/**
 * Esportista handling
 */
class UsuarioController {

    /**
     * New User registration
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if(!(nome && email && senha)) {
                return res.status(400).json({message: 'Nome, e-mail e senha são campos requeridos' });
            }
            if(await existeUsuario(email)) {
                return res.status(409).json({message: 'Usuário já existe. Faça o login'});
            }
            const userCreated = await criarUsuario(nome, email, senha);          
            return res.status(201).json(userCreated);
        } catch (error) {
            return res.status(500).json( { message: error.message });
        }
    }  
    
    /**
     * Existing User login
     * 
     * @param {*} req 
     * @param {*} res 
     * @returns 
     */
    static async login(req, res) {
        try {
            const { email, senha } = req.body;
            if( !(email && senha) ) {
                return res.status(400).json({message: 'E-mail e senha são campos requeridos' });
            }
            const user = await procuraUsuario(email);
            if(user && (await bcrypt.compare(senha, user.senha))) {
                const accessToken = tokens.access.cria(user.id);
                const refreshToken = await tokens.refresh.cria();
                res.set('Authorization', accessToken);
                return res.status(200).json({ refreshToken });
            } else {
                return res.status(400).json({message: 'Credenciais inválidas'});
            }
        } catch (error) {
           return res.status(500).json( { message: error.message }); 
        }
    }

    static async logout(req, res) {
        try {
           const { token } = req.body;
           await tokens.access.invalida(token);
           res.status(200).json({ message: 'Usuário deslogado com sucesso' }); 
        } catch (error) {
            return res.status(500).json( { message: error.message }); 
        }
    }
}

module.exports = UsuarioController;