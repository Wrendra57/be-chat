const express = require("express");
const controllers = require("../app/controllers");

const apiRouter = express.Router();
const middleware = require("../app/middleware/authorization");
/**
 * TODO: Implement your own API
 *       implementations
 */
// apiRouter.get("/api/v1/posts", controllers.api.v1.postController.list);
// apiRouter.post("/api/v1/posts", controllers.api.v1.postController.create);
// apiRouter.put("/api/v1/posts/:id", controllers.api.v1.postController.update);
// apiRouter.get("/api/v1/posts/:id", controllers.api.v1.postController.show);
// apiRouter.delete(
//   "/api/v1/posts/:id",
//   controllers.api.v1.postController.destroy
// );

apiRouter.post(
  "/api/v1/users/register",
  controllers.api.v1.userControler.RegisterUser
);
apiRouter.post(
  "/api/v1/users/otp/:otp",
  controllers.api.v1.userControler.VerifikasiOTP
);
apiRouter.post("/api/v1/users/login", controllers.api.v1.userControler.Login);
apiRouter.post(
  "/api/v1/users/forgotpassword",
  controllers.api.v1.userControler.ForgotPassword
);
apiRouter.post(
  "/api/v1/users/updatepassword",
  middleware.parseToken,
  controllers.api.v1.userControler.updatePassword
);
apiRouter.get(
  "/api/v1/users",
  middleware.parseToken,
  controllers.api.v1.userControler.authUser
);
apiRouter.get(
  "/api/v1/users/:name",
  middleware.parseToken,
  controllers.api.v1.userControler.getUserByName
);

// Room Chatt
apiRouter.post(
  "/api/v1/roomChatsPersonal/:uuid",
  middleware.parseToken,
  controllers.api.v1.roomChatController.createRoomChat
);
apiRouter.post(
  "/api/v1/roomChatsGroup",
  middleware.parseToken,
  controllers.api.v1.roomChatController.createGroupRoom
);

apiRouter.get(
  "/api/v1/roomChats",
  middleware.parseToken,
  controllers.api.v1.roomChatController.listRoomChat
);

apiRouter.get(
  "/api/v1/roomChats/:roomId",
  middleware.parseToken,
  controllers.api.v1.memberChatController.getMemberGroup
);
// create message
apiRouter.post(
  "/api/v1/Chats",
  middleware.parseToken,
  controllers.api.v1.chatController.createChat
);

apiRouter.get(
  "/api/v1/headerChats/:roomId",
  middleware.parseToken,
  controllers.api.v1.roomChatController.getHeader
);
apiRouter.get(
  "/api/v1/Chats/:roomId",
  middleware.parseToken,
  controllers.api.v1.chatController.getAllChat
);

/**
 * TODO: Delete this, this is just a demonstration of
 *       error handler
 */
apiRouter.get("/api/v1/errors", () => {
  throw new Error(
    "The Industrial Revolution and its consequences have been a disaster for the human race."
  );
});

apiRouter.use(controllers.api.main.onLost);
apiRouter.use(controllers.api.main.onError);

module.exports = apiRouter;
