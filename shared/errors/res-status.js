/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Função de RESPOSTA de requisição com ERROS customizados
 ************************************************************************************/
const CampoRequeridoError = require('./campo-requerido');
const CampoIntalteravelError = require('./campo-inalteravel');
const ObjetoExistenteError = require('./objeto-existente');
const ObjetoNaoEncontradoError = require('./objeto-nao-encontrado');
const ListaVaziaError = require('./lista-vazia');
const UserNotFoundError = require('./user-not-found');
const UserNotVerifiedError = require('./user-not-verified');
const UserUnauthorizedError = require('./user-unauthorized');
const InvalidUserOrPasswordError = require('./invalid-user-or-password');
const InvalidArgumentError = require('./invalid-argument');

function resStatus(error, res) {
    if( error instanceof CampoRequeridoError        ||
        error instanceof CampoIntalteravelError     || 
        error instanceof ObjetoExistenteError       ||
        error instanceof ObjetoNaoEncontradoError   ||
        error instanceof ListaVaziaError            ||
        error instanceof UserNotFoundError          ||
        error instanceof UserNotVerifiedError       ||
        error instanceof UserUnauthorizedError      ||
        error instanceof InvalidUserOrPasswordError ||
        error instanceof InvalidArgumentError
    ) {
        return res.status(error.code).json({message: error.message});
    }  
    return res.status(500).json({message: error.message}); 
}

module.exports = resStatus;