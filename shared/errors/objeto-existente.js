/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error conflito com objeto existente
 ************************************************************************************/
class ObjetoExistenteError extends Error {
    constructor(message='') { 
        super(message ? message : 'Objeto já existe');
        this.name = 'ObjetoExistente';
        this.code = 409;
    }
}

module.exports = ObjetoExistenteError;