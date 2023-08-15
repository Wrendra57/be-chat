const { v4: uuidv4 } = require("uuid");
const UserRepository = require("../repositories/userRepository");
const RoomChatsRepository = require("../repositories/roomChatRepository");

const Generate = async () => {
  try {
    const userId = await uuidv4();
    console.log(userId);
    const checkUuidUsers = await UserRepository.findByUuid(userId);
    const checkUuidRoomChat = await RoomChatsRepository.findByUuid(userId);
    console.log(checkUuidUsers);
    console.log(checkUuidRoomChat);
    if (checkUuidUsers !== null || checkUuidRoomChat !== null) {
      console.log("gagal");
      Generate();
    } else {
      console.log("userId");
      console.log(userId);
      return userId;
    }
  } catch (error) {}
};

module.exports = {
  Generate,
};
