// const { roomChatController } = require(".");
const roomChatService = require("../../../services/roomChatService");

const createRoomChat = async (req, res) => {
  try {
    const uuid1 = req.user.uuid;
    const uuid2 = req.params.uuid;

    const createRoom = await roomChatService.createRoomChatPersonal({
      uuid1: uuid1,
      uuid2: uuid2,
    });

    return res.status(createRoom.status).json(createRoom);
  } catch (error) {}
};

const createGroupRoom = async (req, res) => {
  try {
    const member = req.body.member;
    const createGroup = await roomChatService.CreateGroup({
      uuid: req.user.uuid,
      member: req.body.member,
      nameGroup: req.body.nameGroup,
    });
    return res.status(createGroup.status).json(createGroup);
  } catch (error) {}
};

const listRoomChat = async (req, res) => {
  try {
    // console.log(req.user.uuid);
    const listRoom = await roomChatService.listRoomChat({
      uuid: req.user.uuid,
    });
    return res.status(listRoom.status).json(listRoom);
  } catch (error) {}
};

const getHeader = async (req, res, next) => {
  try {
    const get = await roomChatService.getHeader({
      uuid: req.user.uuid,
      roomId: req.params.roomId,
    });
    return res.status(get.status).json(get);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  createRoomChat,
  listRoomChat,
  createGroupRoom,
  getHeader,
};
