'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Documento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Documento.hasMany(models.Compra, {as: 'Compra', foreignKey: 'documento_id'});
      Documento.hasMany(models.Registro, {as: 'Registro', foreignKey: 'documento_id'});  
      Documento.hasMany(models.Autorizacao, {as: 'Autorizacao', foreignKey: 'documento_id'}); 
      Documento.hasMany(models.Apostilamento, {as: 'Apostilamento', foreignKey: 'documento_id'}); 
    }
  }
  Documento.init({
    nome: DataTypes.STRING,
    descricao: DataTypes.TEXT,
    numero: DataTypes.STRING,
    dt_expedicao: DataTypes.DATEONLY,
    dt_validade: DataTypes.DATEONLY,
    arquivo: DataTypes.STRING.BINARY
  }, {
    sequelize,
    modelName: 'Documento',
    tableName: 'documento'
  });
  return Documento;
};