/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Whitelist" associado a tabela "whitelist" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Whitelist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Whitelist.init({
    chave: {
      type : DataTypes.STRING,
      primaryKey: true
    },
    user_id: DataTypes.INTEGER,
    expiracao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Whitelist',
    tableName: 'whitelist'
  });
  return Whitelist;
};