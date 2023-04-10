/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe extendida de Error movimentação não encontrada
 ************************************************************************************/
class MovimentacaoNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Movimentação não encontrada');
        this.name = 'MovimentacaoNotFound';
        this.code = 404;
    } 
}
module.exports = MovimentacaoNotFoundError;