'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('compra', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      pce_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      }, 
      documento_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },                   
      dt_compra: {
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
    await queryInterface.addConstraint('compra', { 
      type: 'FOREIGN KEY',
      name: 'documento_compra_fk',
      fields: ['documento_id'],
      references: {
        table: 'documento',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('compra', { 
      type: 'FOREIGN KEY',
      name: 'pce_compra_fk',
      fields: ['pce_id'],
      references: {
        table: 'pce',
        field: 'id'
      },     
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });        
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('compra','pce_compra_fk');
    await queryInterface.removeConstraint('compra','documento_compra_fk');
    await queryInterface.dropTable('compra');
  }
};