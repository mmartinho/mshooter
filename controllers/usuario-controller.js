/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe controladora "Usuario"
 ************************************************************************************/
const tokens = require('../middleware/tokens');
const Usuario = require('../models/funcoes/usuario');
const EmailVerificacao = require('../models/classes/email-verificacao');
const UserNotFoundError = require('../shared/errors/user-not-found');

function geraEndereco(rota, token) {
    const baseUrl = `${process.env.API_HOST}:${process.env.API_PORT}`;
    return `${baseUrl}${rota}${token}`;
}

function tokenVerificacaoEmail(id) {
    const token = tokens.verificacaoEmail.cria(id);
    return token;
}

async function enviaEmailVerificacao(user) {
    const token = tokenVerificacaoEmail(user.id);
    const endereco = geraEndereco('/usuario/verifica/', token);
    const emailVerificacao = new EmailVerificacao(user, endereco);
    await emailVerificacao.enviaEmail();
}

class UsuarioController {

    static async registrar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if(!(nome && email && senha)) {
                return res.status(400).json({message: 'Nome, e-mail e senha são campos requeridos' });
            }
            if(await Usuario.existe(email)) {
                return res.status(409).json({message: 'Usuário já existe. Faça o login'});
            }
            const userCreated = await Usuario.criar(nome, email, senha); 
            await enviaEmailVerificacao(userCreated);
            return res.status(201).json({ id: userCreated.id, nome: userCreated.nome, email: userCreated.email});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    } 
    
    static async verifica(req, res) {
        try {
          const usuario = req.user; // vem do middleware
          await Usuario.verifica(usuario.id);
          res.status(200).json({message: 'Email verificado com sucesso'});
        } catch (error) {
          res.status(500).json({message: error.message});
        }
    }     

    static async criar(req, res) {
        try {
            const { nome, email, senha } = req.body;
            if(!(nome && email && senha)) {
                return res.status(400).json({message: 'Nome, e-mail e senha são campos requeridos' });
            }
            if(await Usuario.existe(email)) {
                return res.status(409).json({message: 'Usuário já existe. Faça o login'});
            }
            const userCreated = await Usuario.criar(nome, email, senha); 
            const userVerified = await Usuario.verifica(userCreated.id);         
            return res.status(201).json({ id: userVerified.id, nome: userVerified.nome, email: userVerified.email, verificado: userVerified.verificado});
        } catch (error) {
            return res.status(500).json( {message: error.message});
        }
    }      

    static async atualizar(req, res) {
        try {
            const { id } = req.params;
            const novosDados = req.body
            if('email' in novosDados) {
                return res.status(400).json({message: `Não é possível alterar email neste sistema`});
            } else if('senha' in novosDados ) {
                return res.status(400).json({message: `Não é possível alterar a senha do usuário usando esta função. Utilize função específica`});
            } else if('nome' in novosDados && novosDados['nome'] === '') {
                return res.status(400).json({message: `Não é possível deixar o nome de usuário em branco neste sistema`});
            }
            const userUpdated = await Usuario.atualizar(novosDados, id);          
            return res.status(200).json({message: `Usuário '${userUpdated.nome}' foi atualizado com sucesso`});
        } catch (error) {
            if(error instanceof UserNotFoundError) {
                return res.status(404).json({message : error.message});
            }
            if(error instanceof InvalidArgumentError) {
                return res.status(400).json({message : error.message}); 
            }
            return res.status(500).json({message: error.message});
        }
    }     

    static async excluir(req, res) {
        try {
            const { id } = req.params;
            await Usuario.excluir(id);          
            return res.status(200).json({message: `Usuário de id ${id} excluíudo com sucesso`});
        } catch (error) {
            if(error instanceof UserNotFoundError) {
                return res.status(404).json({message : error.message});
            }            
            return res.status(500).json({message: error.message});
        }
    }     
    
    static async login(req, res) {
        try {
            const accessToken = tokens.access.cria(req.user.id);
            const refreshToken = await tokens.refresh.cria(req.user.id);
            res.set('Authorization', accessToken);
            res.status(200).json({ refreshToken });
        } catch (error) {
           return res.status(500).json( { message: error.message }); 
        }
    }

    static async logout(req, res) {
        try {
           const token = req.token; 
           await tokens.access.invalida(token);
           res.status(200).json({ message: 'Usuário deslogado com sucesso' }); 
        } catch (error) {
            return res.status(500).json( { message: error.message }); 
        }
    }   
}

module.exports = UsuarioController;