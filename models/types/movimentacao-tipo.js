const Todos = require('./todos');

class TipoMovimentacao extends Todos {
  constructor() {
    super();
    /** 
     * Movimentação de 'entrada por aquisição' normalmente relacionada a um 
     * documento de Compra de Insumo/Munição 
     */
    this.aquisicao = {description: 'Aquisição', value: 2, direction: 'entrada'};
    /** 
     * Movimentação de 'saída por descarte', normalmente com uma observação 
     * justificativa de defeito ou vencimento de validade de Insumo/Munição 
     */
    this.descarte = {description: 'Descarte', value: 3, direction: 'saida'};
    /** 
     * Movimentação de 'saída por desmontagem' de Munição 
     */
    this.desmontagem = {description: 'Desmontagem', value : 4, direction: 'saida'};
    /**
     * - Movimentação de 'saída por utilização' de Munição usando um PCE em 
     *   um Local.
     * - Movimentação de 'saída por utilização' de Insumo na recarga da
     *   Munição
     */
    this.utilizacao = {description: 'Utilização', value : 5, direction: 'saida'};
    /**
     * Movimentação de 'entrada por recarga' de Munição é criada pela 
     * 'saída por utilização' de Insumos: Projéteis ou Espoleta
     */
    this.recarga = {description: 'Recarga', value : 6, direction: 'entrada'};
    /** 
     * Movimentação de 'entrada por reutilização' de Insumos: Projéteis,  
     * Espoletas ou Estojos 
     */
    this.reutilizacao = {description: 'Reutilização', value : 7, direction: 'entrada'};    
  }

  toDirection(value) {
    for(var key in this) {
      if(key === value) {
        return this[key].direction;
      }
    }
    return '';  
  }

  all() {
    var keys = [];
    for(var key in this) {
      if(typeof this[key] != 'function') { 
        keys.push({
          usar: this[key].value, 
          para_representar: this[key].description,
          usando_direcao : this[key].direction
        }); 
      }
    }
    return keys;
  } 
  
  lista() {
    var keys = [];
    this.all().forEach((key) => {
      keys.push({
        valor : key.usar,
        descricao : `${key.usando_direcao} por ${key.para_representar}`
      });
    })
    return keys;
  }

  entradas (except=[]) {
    var values = [];
    var entrada = 0;
    for(var key in this) {
      if(typeof this[key] != 'function' && this[key].direction == 'entrada') { 
        entrada = this[key].value;
        if(!except.includes(entrada)) {
          values.push(entrada); 
        }
      }
    }      
    return values;
  }

  saidas (except=[]) {
    var values = [];
    var saida = 0;
    for(var key in this) {
      if( typeof this[key] != 'function' && this[key].direction == 'saida') { 
        saida = this[key].value;
        if(!except.includes(saida)) { 
          values.push(saida); 
        }
      }
    }      
    return values;
  }  
}

const tipoMovimentacao = Object.freeze(new TipoMovimentacao()); 

module.exports = tipoMovimentacao;