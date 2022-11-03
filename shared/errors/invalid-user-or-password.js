class InvalidUserOrPasswordError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário ou senha inválidos');
        this.name = 'InvalidUserOrPassword';
    } 
}
module.exports = InvalidUserOrPasswordError;