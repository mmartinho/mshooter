/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Compra" associado a tabela "compra" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Pce, {as: 'Pce', foreignKey: 'pce_id'});
      Compra.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
      Compra.belongsTo(models.Documento.scope('semConteudo'), {as: 'documentoSemConteudo', foreignKey: 'documento_id'});
    }
  }
  Compra.init({
    dt_compra: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Compra',
    tableName: 'compra'
  });
  return Compra;
};