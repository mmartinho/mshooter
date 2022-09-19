'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('frequencia', {
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
      esportista_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },
      dt_frequencia: {
        type: Sequelize.DATEONLY
      },
      arquivo: {
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
    await queryInterface.addConstraint('frequencia', { 
      type: 'FOREIGN KEY',
      name: 'local_frequencia_fk',
      fields: ['local_id'],
      references: {
        table: 'local',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('frequencia', { 
      type: 'FOREIGN KEY',
      name: 'esportista_frequencia_fk',
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
    await queryInterface.removeConstraint('frequencia', 'local_frequencia_fk');
    await queryInterface.removeConstraint('frequencia', 'esportista_frequencia_fk');
    await queryInterface.dropTable('frequencia');
  }
};