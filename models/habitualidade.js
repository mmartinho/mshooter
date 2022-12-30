'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Habitualidade extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Habitualidade.belongsTo(models.Esportista, {as: 'Espostista', foreignKey: 'esportista_id'});
      Habitualidade.belongsTo(models.MunicaoUtilizada, {as: 'MunicaoUtilizada', foreignKey: 'municaoutilizada_id'});
      Habitualidade.belongsTo(models.Documento, {as: 'Documento', foreignKey: 'documento_id'});
      Habitualidade.belongsTo(models.Documento.scope('semConteudo'), {as: 'documentoSemConteudo', foreignKey: 'documento_id'});
    }
  }
  Habitualidade.init({
  }, {
    sequelize,
    modelName: 'Habitualidade',
    tableName: 'habitualidade'
  });
  return Habitualidade;
};