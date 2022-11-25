'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Pce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pce.hasMany(models.Compra, {as: 'Compra', foreignKey: 'pce_id'});
      Pce.hasMany(models.MunicaoUtilizada, {as: 'MunicaoUtilizada', foreignKey: 'pce_id'});
      Pce.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
    }
  };

  Pce.init(
    {
      nome: DataTypes.STRING,
      tipo: DataTypes.INTEGER,
      alias: DataTypes.STRING,
      sigma: DataTypes.STRING,
      nserie: DataTypes.STRING,
      descricao: DataTypes.TEXT,
      marca: DataTypes.STRING,
      modelo: DataTypes.STRING,
      calibre: DataTypes.STRING,
      dt_fabricacao: DataTypes.DATEONLY
    }, 
    {
      sequelize,
      modelName: 'Pce',
      tableName: 'pce'
    }
  );

  return Pce;
};