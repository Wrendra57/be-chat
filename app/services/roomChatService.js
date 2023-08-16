const roomChatRepository = require("../repositories/roomChatRepository");
const memberRoomChatRepository = require("../repositories/memberRoomChatRepository");
// const { v4: uuidv4 } = require("uuid");
const UUID = require("../utils/uuid");
const createRoomChatPersonal = async ({ uuid1, uuid2 }) => {
  try {
    // check
    const checkRoomPersonal = await roomChatRepository.checkRoomPersonal({
      uuid1: uuid1,
      uuid2: uuid2,
    });
    // console.log(checkRoomPersonal);
    if (checkRoomPersonal.length > 0) {
      return {
        status: 200,
        message: "room sudah dibuat",
        data: checkRoomPersonal,
      };
    }
    const uuid = await UUID.Generate();
    // console.log(uuid);

    const payload = {
      id: uuid,
      isGroup: false,
    };

    const createRoomChat = await roomChatRepository.CreateRoomChat(payload);
    // console.log(createRoomChat);

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
    // console.log(uuid);
    const getListRoom = await roomChatRepository.GetListRoomChat(uuid);
    // console.log(getListRoom);
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
    // console.log(uuid);
    // console.log(member);
    // console.log(nameGroup);
    // create admin group

    const roomId = await UUID.Generate();
    // console.log(roomId);

    const payload = {
      id: `${roomId}`,
      isGroup: true,
      nameGroup: nameGroup,
      avatar:
        "https://res.cloudinary.com/dhtypvjsk/image/upload/v1692083201/group-profile-users_icon-icons.com_73540_syhixc.png",
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
      // console.log(element);
      createMember(createRoomChat.id, element, false);
    });

    async function createMember(room_id, userId, isAdmin) {
      const create = await memberRoomChatRepository.createMemberRoomChat({
        room_id: room_id,
        userId: userId,
        isAdmin: isAdmin,
      });
    }

    return {
      status: 200,
      message: "success create group",
      data: createRoomChat,
    };
  } catch (error) {}
};

const getHeader = async ({ uuid, roomId }) => {
  try {
    if (!roomId) {
      return {
        status: 400,
        message: "room id tidak boleh kosong",
        data: null,
      };
    }
    const getHeader = await roomChatRepository.getHeaderRoom({ uuid, roomId });
    // console.log(getHeader);
    if (getHeader.length === 0) {
      return {
        status: 400,
        message: "data tidak ditemukan",
        data: null,
      };
    }
    return {
      status: 200,
      message: "success get header",
      data: getHeader,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  createRoomChatPersonal,
  listRoomChat,
  CreateGroup,
  getHeader,
};
