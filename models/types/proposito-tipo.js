const Todos = require('./todos');

class TipoProposito extends Todos {
  constructor() {
    super();
    this.prova = {description: 'Prova', value: 3};
    this.treino = {description: 'Treino', value: 2};   
  }
}

const tipoProposito = Object.freeze(new TipoProposito()); 
  
module.exports = tipoProposito;