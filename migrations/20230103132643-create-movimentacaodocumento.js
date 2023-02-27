'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimentacaodocumento', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      movimentacao_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }, 
      documento_id: {
        allowNull: false,
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
    await queryInterface.addConstraint('movimentacaodocumento', { 
      type: 'FOREIGN KEY',
      name: 'movimentacao_movimentacaodocumento_fk',
      fields: ['movimentacao_id'],
      references: {
        table: 'movimentacao',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('movimentacaodocumento', { 
      type: 'FOREIGN KEY',
      name: 'documento_movimentacaodocumento_fk',
      fields: ['documento_id'],
      references: {
        table: 'documento',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });              
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('movimentacaodocumento', 'movimentacao_movimentacaodocumento_fk');
    await queryInterface.removeConstraint('movimentacaodocumento', 'documento_movimentacaodocumento_fk');
    await queryInterface.dropTable('movimentacaodocumento');
  }
};