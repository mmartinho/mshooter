'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('municaoutilizada', {
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
      pce_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },      
      municao_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },   
      qtde_usada: {
        type: Sequelize.INTEGER
      },  
      qtde_transportada: {
        type: Sequelize.INTEGER
      },  
      qtde_local: {
        type: Sequelize.INTEGER
      },                           
      dthr_frequencia: {
        type: Sequelize.DATEONLY
      },
      arquivo: {
        type: Sequelize.STRING
      },
      proposito: {
        type: Sequelize.TINYINT(1)
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
    await queryInterface.addConstraint('municaoutilizada', { 
      type: 'FOREIGN KEY',
      name: 'local_municaoutilizada_fk',
      fields: ['local_id'],
      references: {
        table: 'local',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('municaoutilizada', { 
      type: 'FOREIGN KEY',
      name: 'esportista_municaoutilizada_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });  
    await queryInterface.addConstraint('municaoutilizada', { 
      type: 'FOREIGN KEY',
      name: 'pce_municaoutilizada_fk',
      fields: ['pce_id'],
      references: {
        table: 'pce',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });   
    await queryInterface.addConstraint('municaoutilizada', { 
      type: 'FOREIGN KEY',
      name: 'municao_municaoutilizada_fk',
      fields: ['municao_id'],
      references: {
        table: 'municao',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });          
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('municaoutilizada', 'local_municaoutilizada_fk');
    await queryInterface.removeConstraint('municaoutilizada', 'esportista_municaoutilizada_fk');
    await queryInterface.removeConstraint('municaoutilizada', 'pce_municaoutilizada_fk');
    await queryInterface.removeConstraint('municaoutilizada', 'municao_municaoutilizada_fk');
    await queryInterface.dropTable('municaoutilizada');
  }
};