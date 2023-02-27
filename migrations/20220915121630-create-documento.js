'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('documento', {
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
      descricao: {
        type: Sequelize.TEXT
      },
      numero: {
        type: Sequelize.STRING
      },
      dt_expedicao: {
        type: Sequelize.DATEONLY
      },
      dt_validade: {
        type: Sequelize.DATEONLY
      },
      arquivoNome: {
        type: Sequelize.STRING
      }, 
      arquivoExt: {
        type: Sequelize.STRING
      },       
      arquivoConteudo: {
        type: Sequelize.BLOB('long')
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
    await queryInterface.addConstraint('documento', { 
      type: 'FOREIGN KEY',
      name: 'esportista_documento_fk',
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
    await queryInterface.dropTable('documento');
  }
};