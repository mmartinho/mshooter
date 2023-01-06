'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('insumomovimentacaodocumento', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      insumomovimentacao_id: {
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
    await queryInterface.addConstraint('insumomovimentacaodocumento', { 
      type: 'FOREIGN KEY',
      name: 'insumomovimentacao_insumomovimentacaodocumento_fk',
      fields: ['insumomovimentacao_id'],
      references: {
        table: 'insumomovimentacao',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('insumomovimentacaodocumento', { 
      type: 'FOREIGN KEY',
      name: 'documento_insumomovimentacaodocumento_fk',
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
    await queryInterface.removeConstraint('insumomovimentacaodocumento', 'insumomovimentacao_insumomovimentacaodocumento_fk');
    await queryInterface.removeConstraint('insumomovimentacaodocumento', 'documento_insumomovimentacaodocumento_fk');
    await queryInterface.dropTable('insumomovimentacaodocumento');
  }
};