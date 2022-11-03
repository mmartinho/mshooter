'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Autorizacao extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Autorizacao.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
      Autorizacao.belongsTo(models.Local, {as: 'Local', foreignKey: 'local_id'});
    }
  }
  Autorizacao.init({
    local_id: DataTypes.INTEGER,
    documento_id: DataTypes.INTEGER,
    dt_autorizacao: DataTypes.DATEONLY
  }, {
    sequelize,
    modelName: 'Autorizacao',
    tableName: 'autorizacao'
  });  
  return Autorizacao;
};