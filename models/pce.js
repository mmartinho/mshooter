'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class PCE extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };

  PCE.init(
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
      modelName: 'PCE',
      tableName: 'pce'
    }
  );

  return PCE;
};