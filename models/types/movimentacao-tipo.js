const tipoMovimentacao = Object.freeze({
    aquisicao: {description: 'Aquisição', value: 2},
    descarte : {description: 'Descarte', value: 3},
    reciclagem : {description: 'Reciclagem', value : 4},
    utilizacao : {description: 'Utilização', value : 5},
    toDescription : (value) => {
      switch (value) {
        case tipoMovimentacao.aquisicao.value : return tipoMovimentacao.aquisicao.description;
        case tipoMovimentacao.descarte.value : return tipoMovimentacao.descarte.description;
        case tipoMovimentacao.reciclagem.value : return tipoMovimentacao.reciclagem.description;
        case tipoMovimentacao.utilizacao.value : return tipoMovimentacao.utilizacao.description;
        default: return '';
      }    
    }
  }); 
  
  module.exports = tipoMovimentacao;