/************************************************************************************
 * Projeto: mShooter / Backend App
 * Autore(s): Marcus Martinho
 * Data: Ago/2022
 * Arquivo: Define o modelo sequelize "Registro" associado a tabela de 
 *          relacionamento "registro" 
 ************************************************************************************/
'use strict';
const { Model } = require('sequelize');
const tipoRegistro = require('./types/registro-tipo');

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
      Registro.belongsTo(models.Documento.scope('semConteudo'), {as: 'documentoSemConteudo', foreignKey: 'documento_id'});
    }
  }
  Registro.init({
    documento_id: DataTypes.INTEGER,
    esportista_id: DataTypes.INTEGER,
    dt_registro: DataTypes.DATEONLY,
    atividades: DataTypes.STRING,
    tipo: {
      type: DataTypes.INTEGER,
      get() {
         const rawValue = this.getDataValue('tipo');
         return rawValue ? tipoRegistro.toDescription(rawValue) : null;
      }
    },
  }, {
    sequelize,
    modelName: 'Registro',
    tableName: 'registro'
  });
  return Registro;
};