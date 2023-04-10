/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Esportista" associado a tabela "esportista" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Esportista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Esportista.hasMany(models.Registro, {as: 'Registro', foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Municao, {as: 'Municao', foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Pce, {as: 'Pce', foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Local, {as: 'Local', foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Documento, {as: 'Documento', foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'esportista_id'});
      Esportista.hasOne(models.Usuario, {as: 'Usuario', foreignKey: 'esportista_id'});
    }
  }
  Esportista.init({
    nome: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Esportista',
    tableName: 'esportista'
  });
  return Esportista;
};