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

const getListMemberRoomChat = async (params) => {
  try {
    const getListMemberRoomChat = await MemberRoomChats.findAll({
      where: { userId: params },
      include: [
        { model: User, where: {}},
        { model: RoomChats, where: { isGroup: false } },
      ],
    });
    // const getListMemberRoomChat = await RoomChats.findAll({
    //   where: { isGroup: false  },
    //   include: [
    //     {
    //       model: MemberRoomChats,
    //       where: { userId: params },
    //       include: [{ model: User }],
    //     },
    //     { model: Messages },
    //   ],
    // });
    console.log(getListMemberRoomChat[0]);
    return getListMemberRoomChat;
  } catch (error) {}
};

module.exports = { createMemberRoomChat, getListMemberRoomChat };
