/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error objeto PCE inexistente
 ************************************************************************************/
class PceNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'PCE não encontrado');
        this.name = 'PceNotFound';
        this.code = 404;
    } 
}
module.exports = PceNotFoundError;