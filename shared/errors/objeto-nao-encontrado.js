/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error objeto inexistente
 ************************************************************************************/
class ObjetoNaoEncontradoError extends Error {
    constructor(message='') { 
        super(message ? message : 'Objeto não encontrado');
        this.name = 'ObjetoNaoEncontrado';
        this.code = 404;
    }
}

module.exports = ObjetoNaoEncontradoError;