/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Comunicacao" associado a tabela "comunicacao" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Comunicacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Comunicacao.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Comunicacao.hasOne(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'comunicacao_id'});
    }
  }
  Comunicacao.init({
    nome: DataTypes.STRING,     
    email: DataTypes.STRING,
    protocolo: DataTypes.STRING,
    observacao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Comunicacao',
    tableName: 'comunicacao'
  });
  return Comunicacao;
};