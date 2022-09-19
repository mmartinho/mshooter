'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Compra extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Compra.belongsTo(models.Pce, {foreignKey: 'pce_id'});
      Compra.belongsTo(models.Documento, {foreignKey: 'documento_id'});
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