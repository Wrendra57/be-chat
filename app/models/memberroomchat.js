"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class MemberRoomChats extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      console.log(models);
      models.MemberRoomChats.belongsTo(models.User, {
        foreignKey: "userId",
      });
      models.MemberRoomChats.belongsTo(models.RoomChats, {
        foreignKey: "room_id",
      });
    }
  }
  MemberRoomChats.init(
    {
      room_id: { type: DataTypes.STRING, foreignKey: "room_id" },
      userId: { type: DataTypes.STRING, foreignKey: "userId" },
      isAdmin: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "MemberRoomChats",
    }
  );
  return MemberRoomChats;
};
