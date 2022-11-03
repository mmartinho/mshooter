'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
     await queryInterface.bulkInsert('Esportista', [{
        nome: 'Marcus Martinho',
        createdAt: new Date(),
        updatedAt: new Date()         
      }], {});
  },

  async down (queryInterface, Sequelize) {
     await queryInterface.bulkDelete('Esportista', null, {});
  }
};
