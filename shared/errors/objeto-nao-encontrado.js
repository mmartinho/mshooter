class ObjetoNaoEncontradoError extends Error {
    constructor(message='') { 
        super(message ? message : 'Objeto não encontrado');
        this.name = 'ObjetoNaoEncontrado';
        this.code = 404;
    }
}

module.exports = ObjetoNaoEncontradoError;