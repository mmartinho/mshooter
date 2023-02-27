const tipoLocal = Object.freeze({
  localGuarda: {description: 'Local de Guarda', value: 2},
  clube : {description: 'Clube', value: 3},
  federacao : {description: 'Federação', value : 4},
  confederacao : {description: 'Confederação', value : 5},
  fornecedor : {description: 'Fornecedor', value: 6},
  toDescription : (value) => {
    switch (value) {
      case tipoLocal.localGuarda.value : return tipoLocal.localGuarda.description;
      case tipoLocal.clube.value : return tipoLocal.clube.description;
      case tipoLocal.federacao.value : return tipoLocal.federacao.description;
      case tipoLocal.confederacao.value : return tipoLocal.confederacao.description;
      case tipoLocal.fornecedor.value : return tipoLocal.fornecedor.description;
      default: return '';
    }    
  }
}); 

module.exports = tipoLocal;