class ObjetoExistenteError extends Error {
    constructor(message='') { 
        super(message ? message : 'Objeto já existe');
        this.name = 'ObjetoExistente';
        this.code = 409;
    }
}

module.exports = ObjetoExistenteError;