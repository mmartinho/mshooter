'use strict';
const {Model} = require('sequelize');
const tipoLocal = require('./types/local-tipo');

module.exports = (sequelize, DataTypes) => {
  class Local extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Local.hasMany(models.MunicaoUtilizada, {as: 'MunicaoUtilizada', foreignKey: 'local_id'});
      Local.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
    }
  }
  Local.init({
    nome: DataTypes.STRING,
    endereco: DataTypes.STRING,
    tipo: {
      type: DataTypes.INTEGER,
      get() {
         const rawValue = this.getDataValue('tipo');
         return rawValue ? tipoLocal.toDescription(rawValue) : null;
      }
    },
    cnpj: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Local',
    tableName: 'local'
  });
  return Local;
};