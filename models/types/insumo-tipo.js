const Todos = require('./todos');

class TipoInsumo extends Todos {
  constructor() {
    super();
    this.polvora = {description: 'Pólvora', value: 2};
    this.espoleta = {description: 'Espoleta', value: 3};
    this.estojo = {description: 'Estojo', value : 4};
    this.projetil = {description: 'Projétil', value : 5};     
  }
}

const tipoInsumo = Object.freeze(new TipoInsumo());

module.exports = tipoInsumo;