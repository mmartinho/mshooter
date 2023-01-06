const tipoInsumo = Object.freeze({
  polvora: {description: 'Pólvora', value: 2},
  espoleta : {description: 'Espoleta', value: 3},
  estojo : {description: 'Estojo', value : 4},
  projetil : {description: 'Projétil', value : 5},
  toDescription : (value) => {
    switch (value) {
      case tipoInsumo.polvora.value : return tipoInsumo.polvora.description;
      case tipoInsumo.espoleta.value : return tipoInsumo.espoleta.description;
      case tipoInsumo.estojo.value : return tipoInsumo.estojo.description;
      case tipoInsumo.projetil.value : return tipoInsumo.projetil.description;
      default: return '';
    }    
  }
}); 

module.exports = tipoInsumo;