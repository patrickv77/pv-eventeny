'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    await queryInterface.bulkInsert(
      'users',
      [
        {
          username: 'pat1',
          password: '$2a$10$d2x3SoJn8fPrgissAY1aRekXSPzggCaCu/svUt2pPH0d79WiDUjeS',
          //helloworld1
          role: 'admin',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'pat2',
          password: '$2a$10$74ys6gU25dtfUZu3KsmB5.S9n/YIbVzu9GNTSq9m68K7jwI45E68a',
          //helloworld2
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          username: 'pat3',
          password: '$2a$10$VS.rgo8EEx5I52d4N2NmOeHnuCNbWughkN9YbUCuMz8JWhEzbHGvi',
          //helloworld3
          role: 'user',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      ],
      {}
    );

    await queryInterface.bulkInsert(
      'app_template',
      [
        {
          vendor_type: 'food_truck',
          createdAt: new Date(),
          updatedAt: new Date(),
        },
        {
          vendor_type: 'table',
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
          vendor_space: 2,
          description: 'gotta table',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'approved',
        },
        {
          user_id: '2',
          vendor_space: 1,
          description: 'gotta vend',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'waitlisted',
        },
        {
          user_id: '3',
          vendor_space: 2,
          description: 'gotta spread the word',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'waitlisted',
        },
        {
          user_id: '3',
          vendor_space: 1,
          description: 'gotta sell that food',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'rejected',
        },
        {
          user_id: '3',
          vendor_space: 1,
          description: 'gotta make that money',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'approved',
        },
        {
          user_id: '3',
          vendor_space: 1,
          description: 'gotta chase that bag',
          createdAt: new Date(),
          updatedAt: new Date(),
          status: 'awaiting_action',
        },
        
      ],
      {}
    );
  },

  async down (queryInterface, Sequelize) {
    await queryInterface.bulkDelete('Users', null, {});
  }
};
