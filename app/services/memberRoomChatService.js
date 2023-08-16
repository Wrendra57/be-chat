const memberRoomChatRepository = require("../repositories/memberRoomChatRepository");
const getListMemberGroup = async ({ roomId }) => {
  try {
    const getMemberGroups = await memberRoomChatRepository.getAllMembers({
      roomId,
    });

    const allMember = [];

    if (getMemberGroups.length > 0) {
      for (let i = 0; i < getMemberGroups.length; i++) {
        allMember.push(getMemberGroups[i].userId);
      }
    }
    return {
      status: 200,
      message: "success get member",
      data: allMember,
    };
  } catch (error) {}
};
module.exports = { getListMemberGroup };
