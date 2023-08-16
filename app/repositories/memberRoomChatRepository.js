const {
  MemberRoomChats,
  User,
  RoomChats,
  Messages,
  sequelize,
} = require("../models");
const { Op } = require("sequelize");

const createMemberRoomChat = async (params) => {
  //   console.log(params);

  const createMemberRoomChat = await MemberRoomChats.create(params);
  return createMemberRoomChat;
};

const getAllMembers = async ({ roomId }) => {
  const getMemberGroups = await MemberRoomChats.findAll({
    where: { room_id: roomId },
    attributes: ["userId"],
  });
  // console.log("getMemberGroups");
  // console.log(getMemberGroups);
  return getMemberGroups;
};
const checkMember = async ({ uuid, roomId }) => {
  const get = await MemberRoomChats.findAll({
    where: { room_id: roomId, userId: uuid },
  });

  return get;
};

module.exports = { createMemberRoomChat, getAllMembers, checkMember };
