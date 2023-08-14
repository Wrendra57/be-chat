// const { Post } = require("../models");
const { User, sequelize } = require("../models");
const { Op } = require("sequelize");
const CreateUser = async (params) => {
  console.log(params);
  const createUser = await User.create(params);
  return createUser;
};

const findByEmail = async (email) => {
  // console.log(email);
  const findEmail = await User.findOne({ where: { email: email } });
  // console.log(findEmail);
  return findEmail;
};
const findByUuid = async (uuid) => {
  // console.log(uuid);
  const findUser = await User.findOne({ where: { uuid: uuid } });
  // console.log(findEmail);
  return findUser;
};

const updateByEMail = async (email, updateArgs) => {
  // console.log(updateArgs);
  // console.log(email);
  const user = await User.update(updateArgs, { where: { email: email } });

  // console.log(user);
  return user;
};
const updateByUuid = async (uuid, updateArgs) => {
  console.log(updateArgs);
  console.log(uuid);
  const user = await User.update(updateArgs, { where: { uuid: uuid } });

  // console.log(user);
  return user;
};

const findByName = async (name) => {
  try {
    const getUsers = await User.findAll({
      where: { name: { [Op.substring]: `${name}` }, enabled: true },
      attributes: {
        exclude: [
          "password",
          "enabled",
          "otp",
          "createdAt",
          "updatedAt",
          "no_hp",
        ],
      },
    });
    return getUsers;
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  CreateUser,
  findByEmail,
  updateByEMail,
  findByUuid,
  updateByUuid,
  findByName,
};
