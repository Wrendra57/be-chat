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
      `Select rc.id, rc."isGroup", rc."nameGroup", rc."avatar", mrc."userId", mrc."isAdmin", u."name", u."avatar" as "profilUser", msg."content" as "messages", msg."sender_id", msg."isRead"  
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
      left join public."Users" as "u" on mrc."userId"=u."uuid" 
	    left join public."Messages" as "msg" on msg."room_id"= rc."id" and msg."id" in (SELECT MAX(psn."id") FROM public."Messages" as "psn" GROUP BY psn."id" ORDER BY "createdAt" DESC limit 1)
      where mrc."userId" IS NOT null`
    );
    console.log(getList);
    return getList[0];
  } catch (error) {}
};

const findByUuid = async (params) => {
  try {
    const getUuid = await RoomChats.findOne({ where: { id: params } });
    return getUuid;
  } catch (error) {}
};

const checkRoomPersonal = async ({ uuid1, uuid2 }) => {
  try {
    const getRoom =
      await sequelize.query(`select a."room_id", a."userId" as "member1", b."userId" as "member2", c."isGroup"  From public."MemberRoomChats" as "a"
inner join public."MemberRoomChats" as "b" on a."room_id"=b."room_id"
left join public."RoomChats" as "c" on a."room_id"= c."id"
where a."userId"='${uuid1}' and b."userId"='${uuid2}'  and c."isGroup"=false
`);
    return getRoom[0];
  } catch (error) {}
};

module.exports = {
  CreateRoomChat,
  GetListRoomChat,
  findByUuid,
  checkRoomPersonal,
};
