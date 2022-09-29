'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('blacklist', {
      chave: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      expiracao : {
        type: Sequelize.STRING
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
    await queryInterface.dropTable('blacklist');
  }
};