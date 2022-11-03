'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Frequencia extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Frequencia.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Frequencia.belongsTo(models.Local, {as: 'Local', foreignKey: 'local_id'});
    }
  }
  Frequencia.init({
    local_id: DataTypes.INTEGER,
    esportista_id: DataTypes.INTEGER,
    dt_frequencia: DataTypes.DATEONLY,
    arquivo: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Frequencia',
    tableName: 'frequencia'
  });
  return Frequencia;
};