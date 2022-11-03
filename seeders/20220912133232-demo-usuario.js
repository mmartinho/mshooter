'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Usuario', [{
        esportista_id: 1,
        nome: 'Marcus Martinho',
        email: 'marcus_martinho@hotmail.com',
        senha: '$2a$10$YMJGhHwdubrKS25LPCN2fuRkxZtK5rqEv.xvU/sHlMcjzooHTb35W',
        administrador: 0,
        verificado: 1,
        createdAt: new Date(),
        updatedAt: new Date()         
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Usuario', null, {});
  }
};
