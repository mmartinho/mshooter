/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Blacklist" associado a tabela "blacklist" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Blacklist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Blacklist.init({
    chave: { 
      type: DataTypes.STRING,
      primaryKey: true
    },
    expiracao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Blacklist',
    tableName: 'blacklist',
  });
  return Blacklist;
};