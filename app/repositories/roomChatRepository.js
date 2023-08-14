const { RoomChats, sequelize } = require("../models");
const { Op } = require("sequelize");

const CreateRoomChat = async (params) => {
  //   console.log(params);
  const createRoomChat = await RoomChats.create(params);
  return createRoomChat;
};

module.exports = { CreateRoomChat };
