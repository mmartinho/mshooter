'use strict';
const { Model } = require('sequelize');
const unidadeMedida = require('./types/unidade-medida');
const tipoMovimentacao = require('./types/movimentacao-tipo');

module.exports = (sequelize, DataTypes) => {
  class InsumoMovimentacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      InsumoMovimentacao.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      InsumoMovimentacao.belongsTo(models.Municao, {as: 'Municao', foreignKey: 'municao_id'});
      InsumoMovimentacao.belongsTo(models.Insumo, {as: 'Insumo', foreignKey: 'insumo_id'});
    }
  }
  InsumoMovimentacao.init({
    tipo: {
      type: DataTypes.INTEGER,
      get() {
        const rawValue = this.getDataValue('tipo');
        return rawValue ? tipoMovimentacao.toDescription(rawValue) : null;
      }
    },     
    dt_movimentacao: DataTypes.DATEONLY,
    quantidade: DataTypes.INTEGER,
    unidade: {
      type: DataTypes.INTEGER,
      get() {
         const rawValue = this.getDataValue('unidade');
         return rawValue ? unidadeMedida.toDescription(rawValue) : null;
      }
    },    
    observacao: DataTypes.TEXT,
    dthr_comunicacao: DataTypes.DATE,
    email_comunicacao: DataTypes.STRING,
    protocolo_comunicacao: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'InsumoMovimentacao',
    tableName: 'insumomovimentacao'
  });
  return InsumoMovimentacao;
};