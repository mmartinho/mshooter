class CampoInalteravelError extends Error {
    constructor(message='') { 
        super(message ? message : 'Campo não pode ser alterado');
        this.name = 'CampoInalteravel';
        this.code = 400;
    }
}

module.exports = CampoInalteravelError

