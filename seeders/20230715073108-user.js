'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
   return Promise.all([
    await queryInterface.bulkInsert('users', [{
      name: 'Ajay Prakash',
      email: 'ajay@test.123',
      createdAt: new Date(),
      updatedAt: new Date()
    }], {})
   ])
   
   
  },

  async down (queryInterface, Sequelize) {
    return Promise.all([
      queryInterface.bulkDelete('users', null, {}),
  ]);
  }
};
