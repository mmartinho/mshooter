class MovimentacaoNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'Movimentação não encontrada');
        this.name = 'MovimentacaoNotFound';
    } 
}
module.exports = MovimentacaoNotFoundError;