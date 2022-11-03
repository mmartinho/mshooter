'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Apostilamento extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Apostilamento.belongsTo(models.Pce, {as: 'Pce', foreignKey: 'pce_id'});
      Apostilamento.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
    }
  }
  Apostilamento.init({
    dt_apostilamento: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Apostilamento',
    tableName: 'apostilamento'
  });
  return Apostilamento;
};