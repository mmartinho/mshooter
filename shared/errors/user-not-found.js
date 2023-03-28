class UserNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não encontrado');
        this.name = 'UserNotFound';
        this.code = 404;
    } 
}
module.exports = UserNotFoundError;