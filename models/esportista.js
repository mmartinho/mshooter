'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Esportista extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Esportista.hasMany(models.Registro, {foreignKey: 'esportista_id'});
      Esportista.hasMany(models.Frequencia, {foreignKey: 'esportista_id'});
    }
  }
  Esportista.init({
    nome: DataTypes.STRING,
    foto: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Esportista',
    tableName: 'esportista'
  });
  return Esportista;
};