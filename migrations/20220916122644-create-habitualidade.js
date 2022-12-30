'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('habitualidade', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },   
      esportista_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },         
      municaoutilizada_id: {
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
    await queryInterface.addConstraint('habitualidade', { 
      type: 'FOREIGN KEY',
      name: 'esportista_habitualidade_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });    
    await queryInterface.addConstraint('habitualidade', { 
      type: 'FOREIGN KEY',
      name: 'municaoutilizada_habitualidade_fk',
      fields: ['municaoutilizada_id'],
      references: {
        table: 'municaoutilizada',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('habitualidade', { 
      type: 'FOREIGN KEY',
      name: 'documento_habitualidade_fk',
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
    await queryInterface.removeConstraint('habitualidade', 'esportista_habitualidade_fk');
    await queryInterface.removeConstraint('habitualidade', 'municaoutilizada_habitualidade_fk');
    await queryInterface.removeConstraint('habitualidade', 'documento_habitualidade_fk');
    await queryInterface.dropTable('habitualidade');
  }
};