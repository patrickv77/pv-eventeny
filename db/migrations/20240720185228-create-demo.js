'use strict';
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.createTable(
          'users',
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            username: {
              type: Sequelize.STRING,
            },
            password: {
              type: Sequelize.STRING,
            },
            role: {
              type: Sequelize.STRING,
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'app_template',
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            vendor_type: {
              type: Sequelize.STRING,
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
          },
          { transaction: t }
        ),
        queryInterface.createTable(
          'applications',
          {
            id: {
              allowNull: false,
              autoIncrement: true,
              primaryKey: true,
              type: Sequelize.INTEGER,
            },
            user_id: {
              type: Sequelize.INTEGER,
              references: {
                model: {
                  tableName: 'users',
                },
                key: 'id',
              },
            },
            first_name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            last_name: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            phone_number: {
              type: Sequelize.STRING,
              allowNull: false,
            },  
            email: {
              type: Sequelize.STRING,
              allowNull: false,
            },
            vendor_space: {
              type: Sequelize.INTEGER,
              references: {
                model: {
                  tableName: 'app_template',
                },
                key: 'id',
              },
            },
            description: {
              type: Sequelize.STRING,
            },
            status: {
              type: Sequelize.STRING,
            },
            createdAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
            updatedAt: {
              allowNull: false,
              type: Sequelize.DATE,
            },
          },
          { transaction: t }
        ),
      ]);
    });
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.sequelize.transaction((t) => {
      return Promise.all([
        queryInterface.dropTable('users', { transaction: t }),
        queryInterface.dropTable('applications', { transaction: t }),
      ]);
    });
  },
};
