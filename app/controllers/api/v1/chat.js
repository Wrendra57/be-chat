const ChatsService = require("../../../services/chatService");

const createChat = async (req, res) => {
  try {
    const create = await ChatsService.createChat({
      room_id: req.body.room_id,
      content: req.body.content,
      sender_id: req.user.uuid,
    });
    return res.status(create.status).json(create);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = { createChat };
