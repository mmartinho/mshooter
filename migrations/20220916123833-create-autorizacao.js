'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('autorizacao', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      local_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      documento_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_auorizacao: {
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
    await queryInterface.addConstraint('autorizacao', { 
      type: 'FOREIGN KEY',
      name: 'local_autorizacao_fk',
      fields: ['local_id'],
      references: {
        table: 'local',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('autorizacao', { 
      type: 'FOREIGN KEY',
      name: 'documento_autorizacao_fk',
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
    await queryInterface.removeConstraint('autorizacao', 'local_autorizacao_fk');
    await queryInterface.removeConstraint('autorizacao', 'documento_autorizacao_fk');
    await queryInterface.dropTable('autorizacao');
  }
};