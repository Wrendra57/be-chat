const ChatRepository = require("../repositories/chatRepository");

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
module.exports = { createChat };
