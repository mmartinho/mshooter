const tipoMovimentacao = Object.freeze({
    /** 
     * Movimentação de 'entrada por aquisição' normalmente relacionada a um 
     * documento de Compra de Insumo/Munição 
     */
    aquisicao: {description: 'Aquisição', value: 2, direction: 'entrada'},
    /** 
     * Movimentação de 'saída por descarte', normalmente com uma observação 
     * justificativa de defeito ou vencimento de validade de Insumo/Munição 
     */
    descarte : {description: 'Descarte', value: 3, direction: 'saida'},
    /** 
     * Movimentação de 'saída por desmontagem' de Munição 
     */
    desmontagem : {description: 'Desmontagem', value : 4, direction: 'saida'},
    /**
     * - Movimentação de 'saída por utilização' de Munição usando um PCE em 
     *   um Local.
     * - Movimentação de 'saída por utilização' de Insumo na recarga da
     *   Munição
     */
    utilizacao : {description: 'Utilização', value : 5, direction: 'saida'},
    /**
     * Movimentação de 'entrada por recarga' de Munição é criada pela 
     * 'saída por utilização' de Insumos: Projéteis ou Espoleta
     */
    recarga : {description: 'Recarga', value : 6, direction: 'entrada'},
    /** 
     * Movimentação de 'entrada por reutilização' de Insumos: Projéteis,  
     * Espoletas ou Estojos 
     */
    reutilizacao : {description: 'Reutilização', value : 7, direction: 'entrada'},
    toDescription : (value) => {
      switch (value) {
        case tipoMovimentacao.aquisicao.value : return tipoMovimentacao.aquisicao.description;
        case tipoMovimentacao.descarte.value : return tipoMovimentacao.descarte.description;
        case tipoMovimentacao.desmontagem.value : return tipoMovimentacao.desmontagem.description;
        case tipoMovimentacao.utilizacao.value : return tipoMovimentacao.utilizacao.description;
        case tipoMovimentacao.recarga.value : return tipoMovimentacao.recarga.description;
        case tipoMovimentacao.reutilizacao.value : return tipoMovimentacao.reutilizacao.description;
        default: return '';
      }    
    },
    toDirection : (value) => {
      switch (value) {
        case tipoMovimentacao.aquisicao.value : return tipoMovimentacao.aquisicao.direction;
        case tipoMovimentacao.descarte.value : return tipoMovimentacao.descarte.direction;
        case tipoMovimentacao.desmontagem.value : return tipoMovimentacao.desmontagem.direction;
        case tipoMovimentacao.utilizacao.value : return tipoMovimentacao.utilizacao.direction;
        case tipoMovimentacao.recarga.value : return tipoMovimentacao.recarga.direction;
        case tipoMovimentacao.reutilizacao.value : return tipoMovimentacao.reutilizacao.direction;
        default: return '';
      }       
    },
    all: () => {
      var keys = [];
      for(var key in tipoMovimentacao) {
        if( key != 'toDescription' && 
            key != 'all' && 
            key != 'toDirection' && 
            key != 'entradas' && 
            key != 'saidas') 
        { 
          keys.push({
            usar: tipoMovimentacao[key].value, 
            para_representar: tipoMovimentacao[key].description,
            usando_direcao : tipoMovimentacao[key].direction
          }); 
        }
      }
      return keys;
    },
    entradas: (except=[]) => {
      var values = [];
      var entrada = 0;
      for(var key in tipoMovimentacao) {
        if( key != 'toDescription' && 
            key != 'all' && 
            key != 'toDirection' && 
            key != 'entradas' && 
            key != 'saidas' && 
            tipoMovimentacao[key].direction == 'entrada') 
        { 
          entrada = tipoMovimentacao[key].value;
          if(!except.includes(entrada)) {
            values.push(entrada); 
          }
        }
      }      
      return values;
    },
    saidas: (except=[]) => {
      var values = [];
      var saida = 0;
      for(var key in tipoMovimentacao) {
        if( key != 'toDescription' && 
            key != 'all' && 
            key != 'toDirection' && 
            key != 'entradas' && 
            key != 'saidas' && 
            tipoMovimentacao[key].direction == 'saida') 
        { 
          saida = tipoMovimentacao[key].value;
          if(!except.includes(saida)) { 
            values.push(saida); 
          }
        }
      }      
      return values;
    }    
  }); 
  
  module.exports = tipoMovimentacao;