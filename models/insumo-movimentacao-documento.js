'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class InsumoMovimentacaoDocumento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InsumoMovimentacaoDocumento.belongsTo(models.InsumoMovimentacao, {as: 'InsumoMovimentacao', foreignKey: 'insumomovimentacao_id'});
      InsumoMovimentacaoDocumento.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
      InsumoMovimentacaoDocumento.belongsTo(models.Documento.scope('semConteudo'), {as: 'documentoSemConteudo', foreignKey: 'documento_id'});
    }
  }
  InsumoMovimentacaoDocumento.init({
  }, {
    sequelize,
    modelName: 'InsumoMovimentacaoDocumento',
    tableName: 'insumomovimentacaodocumento'
  });
  return InsumoMovimentacaoDocumento;
};