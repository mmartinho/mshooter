'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('whitelist', {
      chave: {
        type: Sequelize.STRING,
        primaryKey: true
      },
      expiracao : {
        type: Sequelize.STRING
      },
      user_id : {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('whitelist');
  }
};