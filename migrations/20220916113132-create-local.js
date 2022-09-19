'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('local', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.TEXT
      },
      tipo: {
        type: Sequelize.TINYINT(1)
      },
      cnpj: {
        type: Sequelize.STRING(20)
      },      
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('local');
  }
};