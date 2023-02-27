const tipoLocal = require('../models/types/local-tipo');

'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {

    await queryInterface.bulkInsert('Local', [
      {
        nome: 'Local de Guarda Principal',
        endereco: 'Av. Constantino Nery, 3451 Apto 301, T02, Manaus/AM',
        tipo: tipoLocal.localGuarda.value,
        esportista_id: 1,
        cnpj: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },      
      {
        nome: 'Clube de Tiro do Amazonas',
        endereco: 'Rodovia Manoel Urbano, Km 04, Iranduba/AM',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: '23658663000101',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Associção e Clube de Tiro da Amazônia Ocidental',
        endereco: 'BR-174, KM 21, Ramal do Pau Rosa, 511 Zona Rural, Manaus/AM',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: '07259423000170',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube Amazonense de Tiro Esportivo',
        endereco: 'AM-010, KM 18, Zona Rural',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube de Tiro Ponta Negra',
        endereco: 'Av. Liberalina Loureiro - Ponta Negra, Manaus/AM',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: '33583079000180',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Confederação Brasileira de Tiro Esportivo',
        endereco: 'Av. Presidente Vargas, 482 - CENTRO, Rio de Janeiro/RJ',
        tipo: tipoLocal.confederacao.value,
        esportista_id: 1,
        cnpj: '34098244000170',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Federação Amazonense de Tiro Esportivo',
        endereco: 'Rua Valerio Botelho De Andrade, 24 - São Francisco, Manaus/AM',
        tipo: tipoLocal.federacao.value,
        esportista_id: 1,
        cnpj: '04017174000118',
        createdAt: new Date(),
        updatedAt: new Date()        
      },
      {
        nome: 'Clube de Tiro do Amazonas em Manaus',
        endereco: 'Beco Parintins,04, Chapada, Manaus/AM',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: '43918335000104',
        createdAt: new Date(),
        updatedAt: new Date()        
      },  
      {
        nome: 'Arena Gun Club',
        endereco: 'R. Duque de Windsor, 2389, Chapada, Manaus/AM, 69050-130',
        tipo: tipoLocal.clube.value,
        esportista_id: 1,
        cnpj: null,
        createdAt: new Date(),
        updatedAt: new Date()        
      }, 
      {
        tipo: tipoLocal.fornecedor.value,
        nome: "SHOOTER'S SUPPLY IND E COM DE COMPONENTES METALICOS LTDA - ME",
        endereco: "AV JOÃO SILVESTRE 1301 - CEP: 18.705-853 - DIST. IND. NOVA AVARÉ - Avaré/SP - Fone: 14-37323005",
        cnpj: "59.095.711/0001-30",
        ie: "194.139.694.116"
      }                                           
    ], { });
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Local', null, {});
  }
};
