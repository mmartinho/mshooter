class UserNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não encontrado');
        this.name = 'UserNotFound';
    } 
}
module.exports = UserNotFoundError;