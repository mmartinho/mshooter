class PceNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'PCE não encontrado');
        this.name = 'PceNotFound';
        this.code = 404;
    } 
}
module.exports = PceNotFoundError;