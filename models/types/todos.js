class Todos {
    constructor() {
    }

    toDescription(value) {
        for(var key in this) {
          if(key === value) {
            return this[key].description;
          }
        }
        return '';  
    }

    toValue(description) {
        for(var key in this) {
          if(key === description) {
            return this[key].value;
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
              para_representar: this[key].description
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
            descricao : key.para_representar
          });
        })
        return keys;
    }

    validas() {
        var keys = [];
        this.all().forEach((key) => {
          keys.push(key.usar);
        });
        return keys;
    }
}

module.exports = Todos;