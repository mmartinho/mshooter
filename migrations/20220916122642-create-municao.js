'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('municao', {
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
        allowNull: false,
        type: Sequelize.STRING
      },    
      origem: {
        type: Sequelize.STRING
      },  
      marca: {
        type: Sequelize.STRING
      },   
      calibre: {
        type: Sequelize.STRING
      }, 
      tipo: {
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
    await queryInterface.addConstraint('municao', { 
      type: 'FOREIGN KEY',
      name: 'esportista_municao_fk',
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
    await queryInterface.removeConstraint('municao', 'esportista_municao_fk');
    await queryInterface.dropTable('municao');
  }
};