/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error usuário não encontrado
 ************************************************************************************/
class UserNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não encontrado');
        this.name = 'UserNotFound';
        this.code = 404;
    } 
}
module.exports = UserNotFoundError;