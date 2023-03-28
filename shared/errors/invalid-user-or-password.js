class InvalidUserOrPasswordError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário ou senha inválidos');
        this.name = 'InvalidUserOrPassword';
        this.code = 401;
    } 
}
module.exports = InvalidUserOrPasswordError;