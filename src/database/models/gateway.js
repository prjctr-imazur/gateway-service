const { Model } = require("sequelize");

module.exports = (sequelize, DataTypes) => {
  class Gateway extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Gateway.init(
    {
      service: DataTypes.STRING,
      url: DataTypes.STRING,
      token: DataTypes.STRING,
    },
    {
      sequelize,
      tableName: 'gateway',
      modelName: "Gateway",
    }
  );
  return Gateway;
};
