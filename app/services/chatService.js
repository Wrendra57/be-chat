const ChatRepository = require("../repositories/chatRepository");
const MemberRoomChatsRepository = require("../repositories/memberRoomChatRepository");
const createChat = async ({ room_id, content, sender_id }) => {
  try {
    if (room_id === "") {
      return {
        status: 400,
        message: "room_id tidak boleh kosong",
        data: null,
      };
    }
    if (content === "") {
      return {
        status: 400,
        message: "pesan tidak boleh kosong",
        data: null,
      };
    }
    if (sender_id === "") {
      return {
        status: 400,
        message: "sender_id tidak boleh kosong",
        data: null,
      };
    }
    const checkMember = await MemberRoomChatsRepository.checkMember({
      uuid: sender_id,
      roomId: room_id,
    });
    if (checkMember.length === 0) {
      return {
        status: 400,
        message: "pesan tidak terkirim, anda bukan anggota ",
        data: null,
      };
    }
    const createMessage = await ChatRepository.createChat({
      room_id,
      content,
      sender_id,
      isRead: false,
    });
    return {
      status: 200,
      message: "pesan berhasil dikirim",
      data: createMessage,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
const getAllChat = async ({ roomId }) => {
  try {
    if (roomId === "") {
      return {
        status: 400,
        message: "room_id tidak boleh kosong",
        data: null,
      };
    }

    const getChat = await ChatRepository.getChat({
      roomId,
    });
    return {
      status: 200,
      message: "success retrieved chat",
      data: getChat,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = { createChat, getAllChat };
