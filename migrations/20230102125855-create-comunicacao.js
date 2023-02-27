'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('comunicacao', {
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
      email: {
        allowNull: false,
        type: Sequelize.STRING
      },  
      protocolo: {
        type: Sequelize.STRING
      },                
      observacao: {
        type: Sequelize.TEXT
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
    await queryInterface.addConstraint('comunicacao', { 
      type: 'FOREIGN KEY',
      name: 'esportista_comunicacao_fk',
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
    await queryInterface.removeConstraint('comunicacao', 'esportista_comunicacao_fk');
    await queryInterface.dropTable('comunicacao');
  }
};