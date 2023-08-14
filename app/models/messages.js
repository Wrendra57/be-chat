"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Messages extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      // models.Messages.belongsTo(models.User, {
      //   foreignKey: "sender_id",
      // });
      // models.Messages.belongsTo(models.RoomChat, {
      //   foreignKey: "room_id",
      // });
      // models.MemberRoomChats.belongsTo(models.User, {
      //   foreignKey: "userId",
      // });
      models.Messages.belongsTo(models.User, {
        foreignKey: "sender_id",
      });
      models.Messages.belongsTo(models.RoomChats, {
        foreignKey: "room_id",
      });
    }
  }
  Messages.init(
    {
      id: {
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      room_id: DataTypes.STRING,
      content: DataTypes.TEXT,
      sender_id: DataTypes.STRING,
      isRead: DataTypes.BOOLEAN,
    },
    {
      sequelize,
      modelName: "Messages",
    }
  );
  return Messages;
};
