'use strict';
const { Model } = require('sequelize');
const tipoProposito = require('./types/proposito-tipo');

module.exports = (sequelize, DataTypes) => {
  class MunicaoUtilizada extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      MunicaoUtilizada.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      MunicaoUtilizada.belongsTo(models.Local, {as: 'Local', foreignKey: 'local_id'});
      MunicaoUtilizada.belongsTo(models.Municao, {as: 'Municao', foreignKey: 'municao_id'});
      MunicaoUtilizada.belongsTo(models.Pce, {as: 'Pce', foreignKey: 'pce_id'});
      MunicaoUtilizada.hasMany(models.Habitualidade, {as: 'Habitualidade', foreignKey: 'municaoutilizada_id'});
    }
  }
  MunicaoUtilizada.init({
    dthr_utilizacao: DataTypes.DATE,
    qtde_usada: DataTypes.INTEGER,
    qtde_transportada: DataTypes.INTEGER,
    qtde_local: DataTypes.INTEGER,
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
    modelName: 'MunicaoUtilizada',
    tableName: 'municaoutilizada'
  });
  return MunicaoUtilizada;
};