const { Messages } = require("../models");
const { sequelize } = require("../models/index.js");
const { Op } = require("sequelize");

const createChat = async (params) => {
  try {
    const create = await Messages.create(params);
    return create;
  } catch (error) {}
};

module.exports = { createChat };
