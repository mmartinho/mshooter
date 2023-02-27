'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Documento.belongsTo(models.Esportista, {as: 'Espostista', foreignKey: 'esportista_id'});
      Documento.hasMany(models.Compra, {as: 'Compra', foreignKey: 'documento_id'});
      Documento.hasMany(models.Registro, {as: 'Registro', foreignKey: 'documento_id'});  
      Documento.hasMany(models.Apostilamento, {as: 'Apostilamento', foreignKey: 'documento_id'}); 
      Documento.hasMany(models.MovimentacaoDocumento, {as: 'MovimentacaoDocumento', foreignKey: 'documento_id'}); 
    }
  }
  Documento.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    numero: DataTypes.STRING,
    dt_expedicao: DataTypes.DATEONLY,
    dt_validade: DataTypes.DATEONLY,
    arquivoNome: DataTypes.STRING,
    arquivoExt: DataTypes.STRING,
    arquivoConteudo: DataTypes.BLOB('long')
  }, {
    sequelize,
    modelName: 'Documento',
    tableName: 'documento',
    scopes : { 
      semConteudo : {
        attributes : { exclude : ['arquivoConteudo']}
      }
    }
  });
  return Documento;
};