'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('usuario', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      esportista_id: {
        type: Sequelize.INTEGER
      },
      nome: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      senha: {
        type: Sequelize.STRING
      },
      token: {
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
    await queryInterface.addConstraint('usuario', { 
      type: 'FOREIGN KEY',
      name: 'esportista_usuario_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    });    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('autorizacao', 'esportista_usuario_fk');
    await queryInterface.dropTable('usuario');
  }
};