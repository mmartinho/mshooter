/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error de identidade de usuário sem verificação
 ************************************************************************************/
class UserNotVerifiedError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não foi verificado');
        this.name = 'UserNotVerified';
        this.code = 401;
    } 
}
module.exports = UserNotVerifiedError;