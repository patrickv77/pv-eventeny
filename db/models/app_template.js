'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class application_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      application_template.hasMany(models.application, {
        foreignKey: 'vendor_type_id',
      });
    }
  }
  application_template.init(
    {
      // unique
      vendor_type: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
    },
    {
      sequelize,
      modelName: 'application_template',
      tableName: 'application_template',
    }
  );
  return application_template;
};
