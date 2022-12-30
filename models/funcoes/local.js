const db = require('../../models');
const DoEsportista = require('./do-esportista');

class Local extends DoEsportista {
    
}

const localDoEsportista = new Local('Local');

module.exports = localDoEsportista;