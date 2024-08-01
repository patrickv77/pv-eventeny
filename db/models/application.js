'use strict';
const { Model } = require('sequelize');
const phoneValidationRegex = /\d{10}/;

module.exports = (sequelize, DataTypes) => {
  class application extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      application.belongsTo(models.user, { foreignKey: 'user_id' });
      application.belongsTo(models.application_template, {
        foreignKey: 'vendor_type_id',
      });
    }
  }
  application.init(
    {
      user_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        references: {
          model: {
            tableName: 'user',
          },
          key: 'id',
        },
      },
      first_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      last_name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      phone_number: {
        type: DataTypes.STRING(10),
        allowNull: false,
        validate: {
          notEmpty: true,
          validator: function (num) {
            return phoneValidationRegex.test(num);
          },
        },
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      vendor_type_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
        references: {
          model: {
            tableName: 'application_template',
          },
          key: 'id',
        },
      },
      description: {
        type: DataTypes.STRING(5000),
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'application',
    }
  );
  return application;
};
