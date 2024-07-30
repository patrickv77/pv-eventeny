'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class app_template extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  app_template.init(
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
      modelName: 'app_template',
      tableName: 'app_template',
    }
  );
  return app_template;
};
