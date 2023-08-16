const MemberRoomChatsService = require("../../../services/memberRoomChatService");

const getMemberGroup = async (req, res) => {
  try {
    // console.log(req.user);
    const getAllMembers = await MemberRoomChatsService.getListMemberGroup({
      roomId: req.params.roomId,
    });
    return res.status(getAllMembers.status).json(getAllMembers);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  getMemberGroup,
};
