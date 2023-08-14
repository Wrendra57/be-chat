/**
 * @file contains entry point of controllers api v1 module
 * @author Fikri Rahmat Nurhidayat
 */

// const postController = require("./postController");
// const Re = require("./userController");
const userControler = require("./userControler");
// const RegisterUser = require("./userControler");
const roomChatController = require("./roomChatControler");
module.exports = {
  // postController,
  userControler,
  roomChatController,
};
