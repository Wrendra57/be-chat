const { RoomChats } = require("../models");
const { sequelize } = require("../models/index.js");
const { Op } = require("sequelize");

const CreateRoomChat = async (params) => {
  //   console.log(params);
  const createRoomChat = await RoomChats.create(params);
  return createRoomChat;
};

const GetListRoomChat = async (params) => {
  console.log("ini");
  console.log(typeof params);
  try {
    const getList = await sequelize.query(
      `Select rc.id, rc."isGroup", rc."nameGroup", rc."avatar", mrc."userId", mrc."isAdmin" as "profilPicture", u."name", u."avatar"  
      from public."RoomChats" as "rc" 
      left join public."MemberRoomChats" as "mrc" ON 
      mrc."room_id" in (select member1."room_id" from public."MemberRoomChats" as "member1" where "userId"='${params}') 
      and
      rc.id=mrc."room_id" and
      (
      case
        when rc."isGroup" = false then mrc."userId" != '${params}'
        else mrc."userId" = '${params}'
      end)
      left join public."Users" as u on mrc."userId"=u."uuid" 
      where mrc."userId" IS NOT NULL`
    );
    console.log(getList);
    return getList[0];
  } catch (error) {}
};

module.exports = { CreateRoomChat, GetListRoomChat };
