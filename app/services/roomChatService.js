const roomChatRepository = require("../repositories/roomChatRepository");
const memberRoomChatRepository = require("../repositories/memberRoomChatRepository");
const { v4: uuidv4 } = require("uuid");
const createRoomChatPersonal = async ({ uuid1, uuid2 }) => {
  try {
    // console.log(uuid1);
    // console.log(uuid2);
    const payload = {
      id: `${uuid1}&${uuid2}`,
      isGroup: false,
    };
    // console.log(payload);
    const createRoomChat = await roomChatRepository.CreateRoomChat(payload);
    console.log(createRoomChat);

    const payloadUUID1 = {
      room_id: createRoomChat.id,
      userId: uuid1,
      isAdmin: false,
    };
    // console.log(payloadUUID1);
    const createMemberRoomChat1 =
      await memberRoomChatRepository.createMemberRoomChat(payloadUUID1);

    const payloadUUID2 = {
      room_id: createRoomChat.id,
      userId: uuid2,
      isAdmin: false,
    };
    const createMemberRoomChat2 =
      await memberRoomChatRepository.createMemberRoomChat(payloadUUID2);

    //
    return {
      status: 200,
      message: "success create room chat",
      data: createRoomChat,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const listRoomChat = async ({ uuid }) => {
  try {
    console.log(uuid);
    const getListRoom = await memberRoomChatRepository.getListMemberRoomChat(
      uuid
    );
    return {
      status: 200,
      message: "success getListRoom",
      data: getListRoom,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const CreateGroup = async ({ uuid, member, nameGroup }) => {
  try {
    console.log(uuid);
    console.log(member);
    console.log(nameGroup);
    // create admin group

    const roomId = await uuidv4();
    // console.log(roomId);

    const payload = {
      id: `${roomId}`,
      isGroup: true,
      nameGroup: nameGroup,
    };
    // console.log(payload);
    const createRoomChat = await roomChatRepository.CreateRoomChat(payload);
    const payloadAdmin = {
      room_id: createRoomChat.id,
      userId: uuid,
      isAdmin: true,
    };
    const createAdmin = await memberRoomChatRepository.createMemberRoomChat(
      payloadAdmin
    );
    member.forEach((element) => {
      console.log(element);
      createMember(createRoomChat.id, element, false);
    });

    async function createMember(room_id, userId, isAdmin) {
      const create = await memberRoomChatRepository.createMemberRoomChat({
        room_id: room_id,
        userId: userId,
        isAdmin: isAdmin,
      });
    }
    // for (let i = 0; i < member.length; i++) {
    //   const createMemberGroup =
    //     await memberRoomChatRepository.CreateMemberGroup({
    //       room_id: createRoomChat.id,
    //       userId: member[i],
    //       isAdmin: false,
    //     });
    // }
    return {
      status: 200,
      message: "success create group",
      data: null,
    };
  } catch (error) {}
};
module.exports = {
  createRoomChatPersonal,
  listRoomChat,
  CreateGroup,
};
