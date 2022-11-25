const tipoProposito = Object.freeze({
    prova: {description: 'Prova', value: 3},
    treino : {description: 'Treino', value: 2},
    toDescription : (value) => {
      switch (value) {
        case tipoProposito.prova.value : return tipoProposito.prova.description;
        case tipoProposito.treino.value : return tipoProposito.treino.description;
        default: return '';
      }    
    }
  }); 
  
  module.exports = tipoProposito;