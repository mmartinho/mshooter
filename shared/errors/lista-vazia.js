/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error lista vazia
 ************************************************************************************/
class ListaVaziaError extends Error {
    constructor(message='') { 
        super(message ? message : 'Lista vazia');
        this.name = 'ListaVazia';
        this.code = 204;
    }
}

module.exports = ListaVaziaError;