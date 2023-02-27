/**
 * Seeder de Movimentação de Aquisição de Munição
 */
'use strict';
const tipoMovimentacao = require('../models/types/movimentacao-tipo');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Movimentacao', [
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 8,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2021-01-14",
        quantidade: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 7,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-07-30",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 17,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-07-30",
        quantidade: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 1,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2017-08-25",
        quantidade: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 1,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2017-09-30",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },                
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 1,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2018-02-24",
        quantidade: 250,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 1,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2018-04-19",
        quantidade: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 2,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2018-02-24",
        quantidade: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 5,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2019-03-06",
        quantidade: 3000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 4,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2019-03-06",
        quantidade: 2200,
        createdAt: new Date(),
        updatedAt: new Date()
      },         
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 6,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-04-14",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 11,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2017-09-02",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 11,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2018-02-24",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 12,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2018-04-19",
        quantidade: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 10,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-07-30",
        quantidade: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 14,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2019-06-25",
        quantidade: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 3,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2021-08-06",
        quantidade: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 3,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2022-03-07",
        quantidade: 1000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 3,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2022-12-06",
        quantidade: 2000,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 9,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-02-19",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 15,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2021-12-16",
        quantidade: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },    
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 16,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2022-04-11",
        quantidade: 300,
        createdAt: new Date(),
        updatedAt: new Date()
      },    
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 13,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2020-12-19",
        quantidade: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 18,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2021-07-16",
        quantidade: 90,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 19,
        tipo: tipoMovimentacao.aquisicao.value,
        dt_movimentacao: "2021-08-16",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },                                                                                                           
    ], { });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movimentacao', null, {});
  }
};
