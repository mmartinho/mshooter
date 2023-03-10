const unidadeMedida = Object.freeze({
  grains: {description: 'grains', value: 2},
  gramas : {description: 'gramas', value: 3},
  unidade : {description: 'unidades', value : 4},
  toDescription : (value) => {
    switch (value) {
      case unidadeMedida.grains.value : return unidadeMedida.grains.description;
      case unidadeMedida.gramas.value : return unidadeMedida.gramas.description;
      case unidadeMedida.unidade.value : return unidadeMedida.unidade.description;
      default: return '';
    }    
  },
  grainsToGrams : (value) => {
    return Number(value)*0.0647989;
  },
  gramsToGrains : (value) => {
    return Number(value)*15.4324;
  }
}); 

module.exports = unidadeMedida;