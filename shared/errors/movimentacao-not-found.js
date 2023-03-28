class MovimentacaoNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Movimentação não encontrada');
        this.name = 'MovimentacaoNotFound';
        this.code = 404;
    } 
}
module.exports = MovimentacaoNotFoundError;