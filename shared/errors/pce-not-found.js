class PceNotFoundError extends Error {
    constructor(message) { 
        super(message ? message : 'PCE não encontrado');
        this.name = 'PceNotFound';
    } 
}
module.exports = PceNotFoundError;