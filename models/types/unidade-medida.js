/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe utilizada para retornar o tipo enumerado "unidadeMedida"
 *          @see models\types\todos.js
 ************************************************************************************/
const Todos = require('./todos');

class UnidadeMedida extends Todos {
  constructor() {
    super();
    this.grains = {description: 'grains', value: 2};
    this.gramas = {description: 'gramas', value: 3};
    this.unidade = {description: 'unidades', value : 4};
  }

  /**
   * @param Number value 
   * @returns Number
   */
  grainsToGrams (value) {
    return Number(value)*0.0647989;
  }

  /**
   * @param Number value 
   * @returns Number
   */
  gramsToGrains (value) {
    return Number(value)*15.4324;
  }
}

const unidadeMedida = Object.freeze(new UnidadeMedida());

module.exports = unidadeMedida;