'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pce', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      tipo: {
        type: Sequelize.TINYINT(1)
      },
      alias: {
        type: Sequelize.STRING
      },
      sigma: {
        type: Sequelize.STRING(20)
      },
      nserie: {
        type: Sequelize.STRING(20)
      },
      descricao: {
        type: Sequelize.TEXT
      },
      marca: {
        type: Sequelize.STRING
      },
      modelo: {
        type: Sequelize.STRING
      },      
      calibre: {
        type: Sequelize.STRING(20)
      },
      dt_fabricacao: {
        type: Sequelize.DATEONLY
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
    await queryInterface.dropTable('pce');
  }
};