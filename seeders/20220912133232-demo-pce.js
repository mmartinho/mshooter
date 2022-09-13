'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('PCE', [
      {
        nome: 'Pistola PT-838',
        tipo: 2,
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
        alias: '',
        sigma: '',
        nserie: '4275-19',
        descricao: 'Prensa manual de recarga marca Recargamatic, com matrizes para os calibres .380ACP e .40SW',
        marca: 'Recargamatic',
        modelo: 'Tipo O',
        calibre: '',
        dt_fabricacao: '2019-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },  
      {
        nome: 'Prensa JMA',
        tipo: 4,
        alias: '',
        sigma: '',
        nserie: '300890820',
        descricao: 'Prensa manual de recarga marca JMA, com matrizes para os calibres .380ACP, .40SW, 38SPL e 9MM Luger',
        marca: 'JMA',
        modelo: 'Tower',
        calibre: '',
        dt_fabricacao: '2020-01-01',
        createdAt: new Date(),
        updatedAt: new Date()
      },                                             
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('PCE', null, {});
     */
  }
};
