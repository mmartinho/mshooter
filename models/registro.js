'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Registro extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Registro.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Registro.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
    }
  }
  Registro.init({
    documento_id: DataTypes.INTEGER,
    esportista_id: DataTypes.INTEGER,
    dt_registro: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'registro'
  });
  return Registro;
};