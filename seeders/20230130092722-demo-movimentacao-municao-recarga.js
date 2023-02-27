/**
 * Seeder de Movimentação de Recarga de Munição
 * @see seeders\20230127072711-demo-movimentacao-insumo-utilizacao.js
 */
'use strict';
const tipoMovimentacao = require('../models/types/movimentacao-tipo');

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Movimentacao', [
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 23,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-02",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 23,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-07",
        quantidade: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 23,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-09-25",
        quantidade: 63,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 23,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-09-23",
        quantidade: 150,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 22,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-11-24",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 22,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-21",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 22,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-04-24",
        quantidade: 116,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 22,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-16",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-08-28",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-09-12",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-10-12",
        quantidade: 146,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-07-16",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-07-17",
        quantidade: 54,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 21,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-05-28",
        quantidade: 69,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-03-05",
        quantidade: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-04-21",
        quantidade: 27,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-10-12",
        quantidade: 106,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-10-28",
        quantidade: 19,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-12-01",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-03",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-13",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-06-12",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-06-26",
        quantidade: 85,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-08-13",
        quantidade: 24,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-12-10",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-02-11",
        quantidade: 57,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-03-04",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-07-08",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-07-15",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-08-12",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 25,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-09-09",
        quantidade: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-11-02",
        quantidade: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      },    
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-11-09",
        quantidade: 98,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-07",
        quantidade: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-14",
        quantidade: 66,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-17",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-24",
        quantidade: 84,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2019-12-28",
        quantidade: 125,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-01-04",
        quantidade: 200,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-01-22",
        quantidade: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-01-31",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-02-10",
        quantidade: 74,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-02-17",
        quantidade: 120,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-02-27",
        quantidade: 220,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-04-21",
        quantidade: 176,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-10-02",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-10-28",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 24,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-11-06",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 26,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-12-07",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 27,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-07-19",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 27,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-07-29",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 27,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-08-26",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-08-25",
        quantidade: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-08-27",
        quantidade: 26,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-09-03",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-09-17",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-10-02",
        quantidade: 25,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-10-08",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-10-16",
        quantidade: 50,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-10-17",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-02-25",
        quantidade: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-03-18",
        quantidade: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-03-25",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-04-02",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-04-22",
        quantidade: 65,
        createdAt: new Date(),
        updatedAt: new Date()
      },    
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-05-20",
        quantidade: 60,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-06-10",
        quantidade: 95,
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 29,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2022-12-02",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 28,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-09-07",
        quantidade: 98,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 28,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-11-28",
        quantidade: 98,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 28,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-12-18",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 28,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2020-12-30",
        quantidade: 100,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        esportista_id: 1,
        comunicacao_id: null,
        municao_id: 28,
        tipo: tipoMovimentacao.recarga.value,
        dt_movimentacao: "2021-01-11",
        quantidade: 40,
        createdAt: new Date(),
        updatedAt: new Date()
      }                          
    ], { });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Movimentacao', null, {});
  }
};
