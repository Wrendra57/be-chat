const { Messages, User } = require("../models");
const { sequelize } = require("../models/index.js");
const { Op } = require("sequelize");

const createChat = async (params) => {
  try {
    const create = await Messages.create(params);
    return create;
  } catch (error) {}
};

const getChat = async ({ roomId }) => {
  const get = await Messages.findAll({
    where: { room_id: roomId },
    include: { model: User, attributes: ["name"] }, 
  });
  console.log(get);
  return get;
};

module.exports = { createChat, getChat };
