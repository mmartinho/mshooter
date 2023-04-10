/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error usuário/senha inválidos
 ************************************************************************************/
class InvalidUserOrPasswordError extends Error {
    constructor(message) { 
        super(message ? message : 'Usuário ou senha inválidos');
        this.name = 'InvalidUserOrPassword';
        this.code = 401;
    } 
}
module.exports = InvalidUserOrPasswordError;