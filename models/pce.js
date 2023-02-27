'use strict';
const { Model } = require('sequelize');
const tipoPCE = require('./types/pce-tipo');

module.exports = (sequelize, DataTypes) => {
  class Pce extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Pce.hasMany(models.Compra, {as: 'Compra', foreignKey: 'pce_id'});
      Pce.hasMany(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'pce_id'});
      Pce.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
    }
  };

  Pce.init(
    {
      nome: DataTypes.STRING,
      tipo: {
        type: DataTypes.INTEGER,
        get() {
           const rawValue = this.getDataValue('tipo');
           return rawValue ? tipoPCE.toDescription(rawValue) : null;
        }
      },
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