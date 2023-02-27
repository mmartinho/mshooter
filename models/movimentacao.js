'use strict';
const { Model } = require('sequelize');
const tipoMovimentacao = require('./types/movimentacao-tipo');
const tipoProposito = require('./types/proposito-tipo');

module.exports = (sequelize, DataTypes) => {
  class Movimentacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Movimentacao.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Movimentacao.belongsTo(models.Municao, {as: 'Municao', foreignKey: 'municao_id'});
      Movimentacao.belongsTo(models.Insumo, {as: 'Insumo', foreignKey: 'insumo_id'});
      Movimentacao.belongsTo(models.Pce, {as: 'Pce', foreignKey: 'pce_id'});
      Movimentacao.belongsTo(models.Local, {as: 'Local', foreignKey: 'local_id'});
      Movimentacao.belongsTo(models.Comunicacao, {as: 'Comunicacao', foreignKey: 'comunicacao_id'});
      Movimentacao.hasMany(models.MovimentacaoDocumento, {as: 'MovimentacaoDocumento', foreignKey: 'movimentacao_id'});
    }
  }
  Movimentacao.init({
    tipo: {
      type: DataTypes.INTEGER,
      get() {
        const rawValue = this.getDataValue('tipo');
        return rawValue ? tipoMovimentacao.toDescription(rawValue) : null;
      }
    },     
    dt_movimentacao: DataTypes.DATEONLY,
    quantidade: DataTypes.INTEGER, 
    proposito: {
      type: DataTypes.INTEGER,
      get() {
        const rawValue = this.getDataValue('proposito');
        return rawValue ? tipoProposito.toDescription(rawValue) : null;
      }         
    },
    observacao: DataTypes.TEXT
  }, {
    sequelize,
    modelName: 'Movimentacao',
    tableName: 'movimentacao'
  });
  return Movimentacao;
};