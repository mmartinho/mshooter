/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error acesso não autorizado
 ************************************************************************************/
class UserUnauthorizedError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não tem credenciais necessárias para acessar esse serviço');
        this.name = 'UserUnauthorized';
        this.code = 401;
    } 
}
module.exports = UserUnauthorizedError;