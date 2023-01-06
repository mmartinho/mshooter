'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('insumo', {
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
      calibre: {
        type: Sequelize.STRING
      },           
      tipo: {
        allowNull: false,
        type: Sequelize.TINYINT(1)
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
    await queryInterface.addConstraint('insumo', { 
      type: 'FOREIGN KEY',
      name: 'esportista_insumo_fk',
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
    await queryInterface.removeConstraint('insumo', 'esportista_insumo_fk');
    await queryInterface.dropTable('insumo');
  }
};