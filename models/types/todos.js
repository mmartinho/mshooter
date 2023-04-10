/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Super classe contendo todos os métodos comuns a tipos enumerados
 ************************************************************************************/
class Todos {
    constructor() {
    }

    /**
     * @param Number value 
     * @returns string
     */
    toDescription(value) {
        for(var key in this) {
          if(key === value) {
            return this[key].description;
          }
        }
        return '';  
    }

    /**
     * @param string description 
     * @returns Number
     */
    toValue(description) {
        for(var key in this) {
          if(key === description) {
            return this[key].value;
          }
        }
        return '';     
    }
      
    /**
     * @returns Object[]
     */
    all() {
        var keys = [];
        for(var key in this) {
          if(typeof this[key] != 'function') { 
            keys.push({
              usar: this[key].value, 
              para_representar: this[key].description
            }); 
          }
        }
        return keys;
    }

    /**
     * @returns Object[]
     */
    lista() {
        var keys = [];
        this.all().forEach((key) => {
          keys.push({
            valor : key.usar,
            descricao : key.para_representar
          });
        })
        return keys;
    }

    /**
     * @returns Number[]
     */
    validas() {
        var keys = [];
        this.all().forEach((key) => {
          keys.push(key.usar);
        });
        return keys;
    }
}

module.exports = Todos;