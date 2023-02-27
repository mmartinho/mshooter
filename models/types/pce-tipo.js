const tipoPCE = Object.freeze({
  pistola: {description: 'Pistola', value: 2},
  carabina : {description: 'Carabina', value: 3},
  outro : {description: 'Outro', value : 4},
  toDescription : (value) => {
    switch (value) {
      case tipoPCE.pistola.value : return tipoPCE.pistola.description;
      case tipoPCE.carabina.value : return tipoPCE.carabina.description;
      case tipoPCE.outro.value : return tipoPCE.outro.description;
      default: return '';
    }    
  }
}); 

module.exports = tipoPCE;