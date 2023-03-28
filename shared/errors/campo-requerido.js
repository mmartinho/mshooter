class CampoRequeridoError extends Error {
    constructor(message='') { 
        super(message ? message : 'Campo requerido');
        this.name = 'CampoRequerido';
        this.code = 400;
    }
}

module.exports = CampoRequeridoError;