/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error argumento inválido
 ************************************************************************************/
class InvalidArgumentError extends Error {
    constructor(message) { 
        super(message ? message : 'Informações informadas não são válidas ou estão incompletas');
        this.name = 'InvalidArgument';
        this.code = 400;
    } 
}
module.exports = InvalidArgumentError;