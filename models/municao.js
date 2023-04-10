/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Municao" associado a tabela "municao" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Municao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Municao.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Municao.hasMany(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'municao_id'});
    }
  }
  Municao.init({
    nome: DataTypes.STRING,
    origem: DataTypes.STRING,
    marca: DataTypes.STRING,
    tipo: DataTypes.STRING, 
    calibre: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Municao',
    tableName: 'municao'
  });
  return Municao;
};