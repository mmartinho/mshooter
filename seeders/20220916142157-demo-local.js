'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Local', [
      {
        nome: 'Local de Guarda Principal',
        endereco: 'Av. Constantino Nery, 3451 Apto 301, T02, Manaus/AM',
        tipo: 2,
        cnpj: '',
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        nome: 'Clube de Tiro do Amazonas',
        endereco: 'Rodovia Manoel Urbano, Km 04, Iranduba/AM',
        tipo: 3,
        cnpj: '23658663000101',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Associção e Clube de Tiro da Amazônia Ocidental',
        endereco: 'BR-174, KM 21, Ramal do Pau Rosa, 511 Zona Rural, Manaus/AM',
        tipo: 3,
        cnpj: '07259423000170',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube Amazonense de Tiro Esportivo',
        endereco: 'AM-010, KM 18, Zona Rural',
        tipo: 3,
        cnpj: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube de Tiro Ponta Negra',
        endereco: 'Av. Liberalina Loureiro - Ponta Negra, Manaus/AM',
        tipo: 3,
        cnpj: '33583079000180',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Confederação Brasileira de Tiro Esportivo',
        endereco: 'Av. Presidente Vargas, 482 - CENTRO, Rio de Janeiro/RJ',
        tipo: 5,
        cnpj: '34098244000170',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Federação Amazonense de Tiro Esportivo',
        endereco: 'Rua Valerio Botelho De Andrade, 24 - São Francisco, Manaus/AM',
        tipo: 4,
        cnpj: '04017174000118',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube de Tiro do Amazonas em Manaus',
        endereco: 'Beco Parintins,04, Chapada, Manaus/AM',
        tipo: 3,
        cnpj: '43918335000104',
        createdAt: new Date(),
        updatedAt: new Date()        
      },                                             
    ], {});
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Local', null, {});
  }
};
