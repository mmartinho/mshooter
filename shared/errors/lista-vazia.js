class ListaVaziaError extends Error {
    constructor(message='') { 
        super(message ? message : 'Lista vazia');
        this.name = 'ListaVazia';
        this.code = 204;
    }
}

module.exports = ListaVaziaError;