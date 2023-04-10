/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Classe utilizada para retornar o tipo enumerado "tipoRegistro"
 *          @see models\types\todos.js
 ************************************************************************************/
const Todos = require('./todos');

class TipoRegistro extends Todos {
  constructor() {
    super();
    this.cr = {description: 'Certificado de Registro', value: 2};
    this.id = {description: 'Indentidade', value: 3};
    this.cpf = {description: 'CPF', value : 4};
    this.cnh = {description: 'CNH', value : 5};
    this.outro = {description: 'Outro', value : 6};
  }

  /**
   * @returns Number[]
   */
  identificadores() {
    return [this.id.value, this.cpf.value, this.cnh.value];
  }
}

const tipoRegistro = Object.freeze(new TipoRegistro()); 
  
module.exports = tipoRegistro;