'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('local', {
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
      nome: {
        type: Sequelize.STRING
      },
      endereco: {
        type: Sequelize.TEXT
      },
      tipo: {
        type: Sequelize.TINYINT(1)
      },
      cnpj: {
        type: Sequelize.STRING(20)
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
    await queryInterface.addConstraint('local', { 
      type: 'FOREIGN KEY',
      name: 'esportista_local_fk',
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
    await queryInterface.removeConstraint('local','esportista_local_fk');
    await queryInterface.dropTable('local');
  }
};