class UserUnauthorizedError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não tem credenciais necessárias para acessar esse serviço');
        this.name = 'UserUnauthorized';
    } 
}
module.exports = UserUnauthorizedError;