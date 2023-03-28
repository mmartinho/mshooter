class UserNotVerifiedError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário não foi verificado');
        this.name = 'UserNotVerified';
        this.code = 401;
    } 
}
module.exports = UserNotVerifiedError;