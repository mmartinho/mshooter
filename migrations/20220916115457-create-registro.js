'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('registro', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      documento_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      esportista_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_registro: {
        type: Sequelize.DATEONLY
      },
      atividades: {
        type: Sequelize.STRING
      }, 
      tipo: {
        allowNull: false,
        type: Sequelize.TINYINT(1),
        default: 2
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
    await queryInterface.addConstraint('registro', { 
      type: 'FOREIGN KEY',
      name: 'documento_registro_fk',
      fields: ['documento_id'],
      references: {
        table: 'documento',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('registro', { 
      type: 'FOREIGN KEY',
      name: 'esportista_registro_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });    
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('registro', 'documento_registro_fk');
    await queryInterface.removeConstraint('registro', 'esportista_registro_fk');
    await queryInterface.dropTable('registro');
  }
};