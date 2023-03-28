const Todos = require('./todos');

class TipoPCE extends Todos {
  constructor() {
    super();
    this.pistola = {description: 'Pistola', value: 2};
    this.carabina = {description: 'Carabina', value: 3};
    this.outro = {description: 'Outro', value : 4}; 
  }
}

const tipoPCE = Object.freeze(new TipoPCE()); 
  
module.exports = tipoPCE;