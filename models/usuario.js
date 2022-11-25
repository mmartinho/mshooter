'use strict';
const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Usuario extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Usuario.belongsTo(models.Esportista, {as: 'Esportista', foreignKey: 'esportista_id'});
    }
  }
  Usuario.init({
    esportista_id: DataTypes.INTEGER,
    nome: DataTypes.STRING,
    email: DataTypes.STRING,
    senha: DataTypes.STRING,
    administrador: DataTypes.INTEGER,
    verificado: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Usuario',
    tableName: 'usuario'
  });
  return Usuario;
};