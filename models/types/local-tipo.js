const Todos = require('./todos');

class TipoLocal extends Todos {
  constructor() {
    super();
    this.localGuarda = {description: 'Local de Guarda', value: 2};
    this.clube = {description: 'Clube', value: 3};
    this.federacao = {description: 'Federação', value : 4};
    this.confederacao = {description: 'Confederação', value : 5};
    this.fornecedor = {description: 'Fornecedor', value: 6};    
  }
}

const tipoLocal = Object.freeze(new TipoLocal()); 

module.exports = tipoLocal;