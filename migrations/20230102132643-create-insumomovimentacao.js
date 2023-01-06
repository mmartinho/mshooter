'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('insumomovimentacao', {
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
      insumo_id: {
        allowNull: false,
        type: Sequelize.INTEGER
      },    
      municao_id: {
        allowNull: false,
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
        type: Sequelize.INTEGER
      },                           
      unidade: {
        type: Sequelize.TINYINT(1)
      },  
      dthr_comunicacao: {
        type: Sequelize.DATE
      }, 
      email_comunicacao: {
        type: Sequelize.STRING
      },  
      protocolo_comunicacao: {
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
    await queryInterface.addConstraint('insumomovimentacao', { 
      type: 'FOREIGN KEY',
      name: 'insumo_insumomovimentacao_fk',
      fields: ['insumo_id'],
      references: {
        table: 'insumo',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });
    await queryInterface.addConstraint('insumomovimentacao', { 
      type: 'FOREIGN KEY',
      name: 'esportista_insumomovimentacao_fk',
      fields: ['esportista_id'],
      references: {
        table: 'esportista',
        field: 'id'
      },
      onDelete: 'CASCADE',
      onUpdate: 'CASCADE'
    });    
    await queryInterface.addConstraint('insumomovimentacao', { 
      type: 'FOREIGN KEY',
      name: 'municao_insumomovimentacao_fk',
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
    await queryInterface.removeConstraint('insumomovimentacao', 'insumo_insumomovimentacao_fk');
    await queryInterface.removeConstraint('insumomovimentacao', 'esportista_insumomovimentacao_fk');
    await queryInterface.removeConstraint('insumomovimentacao', 'municao_insumomovimentacao_fk');
    await queryInterface.dropTable('insumomovimentacao');
  }
};