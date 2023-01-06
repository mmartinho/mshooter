'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Insumo', [
      {
        tipo: 2,
        nome: "POLVORA CBC 216 EMB. 1KG CX.1KG",
        calibre: null,
        createdAt: "2023-01-03 08:24:46",
        updatedAt: "2023-01-03 08:24:46",
        esportista_id: 1
      },      
      {
        tipo: 2,
        nome: "POLVORA CBC 219 EMB. 1KG CX.1KG",
        calibre: null,
        createdAt: "2023-01-03 08:07:46",
        updatedAt: "2023-01-03 08:09:55",
        esportista_id: 1
      },
      {
        tipo: 3,
        nome: "ESPOL FULMIN CBC 1 1/2 S.PISTOL",
        calibre: null,
        createdAt: "2023-01-03 08:18:45",
        updatedAt: "2023-01-03 08:18:45",
        esportista_id: 1
      },
      {
        tipo: 3,
        nome: "ESPOL FULMIN CBC 2 1/2 L.PISTOL",
        calibre: null,
        createdAt: "2023-01-03 08:19:26",
        updatedAt: "2023-01-03 08:19:26",
        esportista_id: 1
      },
      {
        tipo: 4,
        nome: "ESTOJO 38SPL S/ESPOL",
        calibre: ".38SPL",
        createdAt: "2023-01-03 08:25:29",
        updatedAt: "2023-01-03 08:25:29",
        esportista_id: 1
      },
      {
        tipo: 4,
        nome: "ESTOJO 380AUTO S/ESPOL",
        calibre: ".380AUTO",
        createdAt: "2023-01-03 08:25:41",
        updatedAt: "2023-01-03 08:25:41",
        esportista_id: 1
      },
      {
        tipo: 4,
        nome: "ESTOJO 40SW S/ESPO",
        calibre: ".40SW",
        createdAt: "2023-01-03 08:25:55",
        updatedAt: "2023-01-03 08:25:55",
        esportista_id: 1
      },
      {
        tipo: 4,
        nome: "ESTOJO 9MM S/ESPOL",
        calibre: "9MM",
        createdAt: "2023-01-03 08:26:07",
        updatedAt: "2023-01-03 08:26:07",
        esportista_id: 1
      },
      {
        tipo: 4,
        nome: "ESTOJO 45AUTO S/ESPOL",
        calibre: ".45AUTO",
        createdAt: "2023-01-03 08:26:19",
        updatedAt: "2023-01-03 08:26:19",
        esportista_id: 1
      },       
      {
        tipo: 5, 
        nome: "PROJ CBC 38SPL EXPO 158GR",
        calibre: ".38SPL",
        createdAt: "2023-01-03 08:19:51",
        updatedAt: "2023-01-03 08:19:51",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC 380AUTO EXPO 95GR",
        calibre: ".380AUTO",
        createdAt: "2023-01-03 08:20:04",
        updatedAt: "2023-01-03 08:20:04",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC 380AUTO ETOG 95GR",
        calibre: ".380AUTO",
        createdAt: "2023-01-03 08:20:18",
        updatedAt: "2023-01-03 08:20:18",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC 40SW ETPP 180GR",
        calibre: ".40SW",
        createdAt: "2023-01-03 08:20:29",
        updatedAt: "2023-01-03 08:20:29",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC 9MM ETOG 124GR",
        calibre: "9MM",
        createdAt: "2023-01-03 08:20:46",
        updatedAt: "2023-01-03 08:20:46",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ LYON 40 POG 180GR",
        calibre: ".40SW",
        createdAt: "2023-01-03 08:21:02",
        updatedAt: "2023-01-03 08:21:02",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ LYON 380 POG PF 95GR",
        calibre: ".380AUTO",
        createdAt: "2023-01-03 08:21:48",
        updatedAt: "2023-01-03 08:21:48",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ BUFFALO 38SPL POG 158GR",
        calibre: ".38SPL",
        createdAt: "2023-01-03 08:22:08",
        updatedAt: "2023-01-03 08:22:08",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ BUFFALO 9MM PPP 125GR",
        calibre: "9MM",
        createdAt: "2023-01-03 08:22:24",
        updatedAt: "2023-01-03 08:22:24",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ BUFFALO 45AUTO ETOG 230GR",
        calibre: ".45AUTO",
        createdAt: "2023-01-03 08:22:36",
        updatedAt: "2023-01-03 08:22:36",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ BUFALLO 9MM ETOG 124GR",
        calibre: "9MM",
        createdAt: "2023-01-03 08:22:47",
        updatedAt: "2023-01-03 08:22:47",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ BUFFALO 45AUTO POG 230GR",
        calibre: ".45AUTO",
        createdAt: "2023-01-03 08:22:58",
        updatedAt: "2023-01-03 08:22:58",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC 45AUTO ETOG 230GR",
        calibre: ".45AUTO",
        createdAt: "2023-01-03 08:23:11",
        updatedAt: "2023-01-03 08:23:11",
        esportista_id: 1
      },
      {
        tipo: 5,
        nome: "PROJ CBC .38 SPL EXPP 158GR",
        calibre: ".38SPL",
        createdAt: "2023-01-03 08:23:28",
        updatedAt: "2023-01-03 08:23:28",
        esportista_id: 1
      }    
    ], { });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Insumo', null, {});
  }
};
