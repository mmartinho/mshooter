const tipoInsumo = require('./types/insumo-tipo');

'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Insumo extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Insumo.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
      Insumo.hasMany(models.Movimentacao, {as: 'Movimentacao', foreignKey: 'insumo_id'});
    }
  }
  Insumo.init({
    nome: DataTypes.STRING,
    calibre: DataTypes.STRING,     
    tipo: {
      type: DataTypes.INTEGER,
      get() {
         const rawValue = this.getDataValue('tipo');
         return rawValue ? tipoInsumo.toDescription(rawValue) : null;
      }      
    }
  }, {
    sequelize,
    modelName: 'Insumo',
    tableName: 'insumo'
  });
  return Insumo;
};