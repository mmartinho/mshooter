/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "MovimentacaoDocumento" associado a tabela 
 *          de relacionamento "movimentacaodocumento" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class MovimentacaoDocumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MovimentacaoDocumento.belongsTo(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'movimentacao_id'});
      MovimentacaoDocumento.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
      MovimentacaoDocumento.belongsTo(models.Documento.scope('semConteudo'), {as: 'documentoSemConteudo', foreignKey: 'documento_id'});
    }
  }
  MovimentacaoDocumento.init({
  }, {
    sequelize,
    modelName: 'MovimentacaoDocumento',
    tableName: 'movimentacaodocumento'
  });
  return MovimentacaoDocumento;
};