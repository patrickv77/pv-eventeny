'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'pat1',
          password: 'helloworld1',
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'pat2',
          password: 'helloworld2',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
