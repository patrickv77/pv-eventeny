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
        {
          username: 'pat3',
          password: 'helloworld3',
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'applications',
      [
        {
          user_id: '2',
          vendor_space: 'table',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'approved',
        },
        {
          user_id: '2',
          vendor_space: 'food_truck',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'waitlisted',
        },
        {
          user_id: '3',
          vendor_space: 'table',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'waitlisted',
        },
        {
          user_id: '3',
          vendor_space: 'food_truck',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'approved',
        },
        {
          user_id: '3',
          vendor_space: 'food_truck',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'awaiting action',
        },
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
