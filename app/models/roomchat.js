"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class RoomChats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      models.RoomChats.hasMany(models.Messages, {
        foreignKey: "room_id",
      });
      models.RoomChats.hasMany(models.MemberRoomChats, {
        foreignKey: "room_id",
      });
    }
  }
  RoomChats.init(
    {
      id: { type: DataTypes.STRING, primaryKey: true, autoIncrement: false },
      isGroup: DataTypes.BOOLEAN,
      nameGroup: DataTypes.STRING,
      avatar: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: "RoomChats",
    }
  );
  return RoomChats;
};
