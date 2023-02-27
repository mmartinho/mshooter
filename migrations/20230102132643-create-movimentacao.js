'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('movimentacao', {
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
      comunicacao_id: {
        type: Sequelize.INTEGER
      },      
      insumo_id: {
        type: Sequelize.INTEGER
      },    
      municao_id: {
        type: Sequelize.INTEGER
      },
      local_id: {
        type: Sequelize.INTEGER
      },
      pce_id: {
        type: Sequelize.INTEGER
      },         
      dt_movimentacao: {
        allowNull: false,
        type: Sequelize.DATEONLY
      },  
      tipo: {
        allowNull: false,
        type: Sequelize.TINYINT(1)
      },                 
      quantidade: {
        allowNull: false,
        type: Sequelize.INTEGER
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
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'insumo_movimentacao_fk',
      fields: ['insumo_id'],
      references: {
        table: 'insumo',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'esportista_movimentacao_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });    
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'municao_movimentacao_fk',
      fields: ['municao_id'],
      references: {
        table: 'municao',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'comunicacao_movimentacao_fk',
      fields: ['comunicacao_id'],
      references: {
        table: 'comunicacao',
        field: 'id'
      },
      onDelete: 'SET NULL',
      onUpdate: 'SET NULL'
    }); 
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'pce_movimentacao_fk',
      fields: ['pce_id'],
      references: {
        table: 'pce',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });  
    await queryInterface.addConstraint('movimentacao', { 
      type: 'FOREIGN KEY',
      name: 'local_movimentacao_fk',
      fields: ['local_id'],
      references: {
        table: 'local',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });                     
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint('movimentacao', 'insumo_movimentacao_fk');
    await queryInterface.removeConstraint('movimentacao', 'esportista_movimentacao_fk');
    await queryInterface.removeConstraint('movimentacao', 'municao_movimentacao_fk');
    await queryInterface.removeConstraint('movimentacao', 'pce_movimentacao_fk');
    await queryInterface.removeConstraint('movimentacao', 'comunicacao_movimentacao_fk');
    await queryInterface.removeConstraint('movimentacao', 'local_movimentacao_fk');
    await queryInterface.dropTable('movimentacao');
  }
};