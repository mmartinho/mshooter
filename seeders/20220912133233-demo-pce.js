'use strict';
const db = require('../models');

module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert('Pce', [
      {
        nome: 'Pistola PT-838',
        tipo: 2,
        esportista_id: 1,
        alias: 'Tathiana',
        sigma: '855098',
        nserie: 'KIT12948',
        descricao: 'Pistola de uso permitido',
        marca: 'Taurus',
        modelo: 'PT-838',
        calibre: '.380',
        dt_fabricacao: '2015-07-09',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Carabina CBC 7022 way',
        tipo: 3,
        esportista_id: 1,
        alias: 'Cartarina',
        sigma: '875344',
        nserie: 'EPG4199102',
        descricao: 'Carabina de uso permitido',
        marca: 'CBC',
        modelo: '7022 way',
        calibre: '.22LR',
        dt_fabricacao: '2017-04-02',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Pistola Ruger Mark 1',
        tipo: 2,
        esportista_id: 1,
        alias: 'Ruggy',
        sigma: '454829',
        nserie: '1654072',
        descricao: 'Pistola de uso permitido',
        marca: 'Ruger',
        modelo: 'Mark 1',
        calibre: '.22LR',
        dt_fabricacao: '1980-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },   
      {
        nome: 'Pistola Imbel MD2A2',
        tipo: 2,
        esportista_id: 1,
        alias: 'Mamba Albina',
        sigma: '150077',
        nserie: 'ECA01182',
        descricao: 'Pistola de uso permitido',
        marca: 'Imbel',
        modelo: 'MD2A2',
        calibre: '.40S&W',
        dt_fabricacao: '2006-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Pistola Smith & Wesson',
        tipo: 2,
        esportista_id: 1,
        alias: 'Silvia Silver',
        sigma: '1069537',
        nserie: 'UEF0715',
        descricao: 'Pistola de uso permitido',
        marca: 'Smith & Wesson',
        modelo: 'SW22',
        calibre: '.22LR',
        dt_fabricacao: '2019-09-13',
        createdAt: new Date(),
        updatedAt: new Date()
      },      
      {
        nome: 'Carabina Puma 38',
        tipo: 3,
        esportista_id: 1,
        alias: 'Maria Bonita',
        sigma: '332129',
        nserie: 'SB000915',
        descricao: 'Carabina de uso permitido',
        marca: 'Rossi',
        modelo: 'Puma 38',
        calibre: '.38SPL',
        dt_fabricacao: '1990-01-11',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Pistola PT92',
        tipo: 2,
        esportista_id: 1,
        alias: 'Monica Bellucci',
        sigma: '1125564',
        nserie: 'ABB320429',
        descricao: 'Pistola de uso permitido',
        marca: 'Taurus',
        modelo: 'PT-92 AFS-D',
        calibre: '9mm',
        dt_fabricacao: '2019-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Pistola PT1911',
        tipo: 2,
        esportista_id: 1,
        alias: 'Ana de Armas',
        sigma: '1819675',
        nserie: 'ABN319389',
        descricao: 'Pistola de uso permitido',
        marca: 'Taurus',
        modelo: 'PT-1911',
        calibre: '.45ACP',
        dt_fabricacao: '2020-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Prensa Recargamatic',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: '4275-19',
        descricao: 'Prensa manual de recarga marca Recargamatic, com matrizes para os calibres .380ACP e .40SW',
        marca: 'Recargamatic',
        modelo: 'Tipo O',
        calibre: null,
        dt_fabricacao: '2019-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        nome: 'Prensa JMA',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: '300890820',
        descricao: 'Prensa manual de recarga marca JMA, com matrizes para os calibres .380ACP, .40SW, 38SPL e 9MM Luger',
        marca: 'JMA',
        modelo: 'Tower',
        calibre: null,
        dt_fabricacao: '2020-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Matrizes Lee 38SPL/357MAG',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: null,
        descricao: 'CJ DE MATRIZES PARA RECARGA DE MUNIÇOES (4 PC), WOD LEE 38SPL/357MAG DELUXE PISTOL CARBIDE 4 DIE SET CAL 38SPL/357MAG',
        marca: 'Lee Precision',
        modelo: null,
        calibre: '38SPL/357MAG',
        dt_fabricacao: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Matrizes Lee 9MM',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: null,
        descricao: 'CJ DE MATRIZES PARA RECARGA DE MUNIÇAO WOD LEE 9MM DELUXE PISTOL CARB DIE SET PARA RECARGA CALIBRE 9MM',
        marca: 'Lee Precision',
        modelo: null,
        calibre: '9MM',
        dt_fabricacao: null,
        createdAt: new Date(),
        updatedAt: new Date()
      }, 
      {
        nome: 'Matrizes Lee 40S&W/10MM',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: null,
        descricao: 'CJ DE MATRIZES PARA RECARGA DE MUNIÇOES (4 PC) WOD LEE 40S&W/10MM DELUXE PISTOL CARBIDE 4 DIE SET CALIBRE 40S&W/10MM',
        marca: 'Lee Precision',
        modelo: null,
        calibre: '40S&W/10MM',
        dt_fabricacao: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        nome: 'Matrizes Lee 45ACP',
        tipo: 4,
        esportista_id: 1,
        alias: null,
        sigma: null,
        nserie: null,
        descricao: 'CJ DE MATRIZES PARA RECARGA DE MUNIÇOES (4 PC) WOD LEE 45ACP DELUXE PISTOL CARBIDE 4 DIE SET CALIBRE 45ACP',
        marca: 'Lee Precision',
        modelo: null,
        calibre: '45ACP',
        dt_fabricacao: null,
        createdAt: new Date(),
        updatedAt: new Date()
      },                                                                 
    ], { }); 
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Pce', null, {});
  }
};
