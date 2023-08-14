"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.User.hasMany(models.MemberRoomChats, {
        foreignKey: "userId",
      });
      models.User.hasMany(models.Messages, {
        foreignKey: "sender_id",
      });
    }
  }
  User.init(
    {
      id: { type: DataTypes.BIGINT, autoIncrement: true },
      uuid: { type: DataTypes.STRING, primaryKey: true },
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      avatar: DataTypes.STRING,
      enabled: DataTypes.BOOLEAN,
      name: DataTypes.STRING,
      otp: DataTypes.INTEGER,
      no_hp: DataTypes.BIGINT,
    },
    {
      sequelize,
      modelName: "User",
      
    }
  );
  return User;
};
