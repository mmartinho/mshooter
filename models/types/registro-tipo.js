const tipoRegistro = Object.freeze({
    cr: {description: 'Certificado de Registro', value: 2},
    id : {description: 'Indentidade', value: 3},
    cpf : {description: 'CPF', value : 4},
    cnh : {description: 'CNH', value : 5},
    outro : {description: 'Outro', value : 6},
    toDescription : (value) => {
      switch (value) {
        case tipoRegistro.cr.value : return tipoRegistro.cr.description;
        case tipoRegistro.id.value : return tipoRegistro.id.description;
        case tipoRegistro.cpf.value : return tipoRegistro.cpf.description;
        case tipoRegistro.cnh.value : return tipoRegistro.cnh.description;
        case tipoRegistro.outro.value : return tipoRegistro.outro.description;
        default: return '';
      }    
    },
    identificadores: () => {
      return [tipoRegistro.id.value, tipoRegistro.cpf.value, tipoRegistro.cnh.value];
    }
  }); 
  
  module.exports = tipoRegistro;