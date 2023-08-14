const bcrypt = require("bcrypt");
require("dotenv").config();
const DecodePassword = async (password) => {
  try {
    // console.log(typeof password);
    // console.log(typeof process.env.SALT);
    const decode = await bcrypt.hash(password, parseInt(process.env.SALT));
    // console.log(decode);
    return decode;
  } catch (error) {
    return {
      status: 500,
      messsage: error.message,
      data: null,
    };
  }
};

const comparePasswords = async (password, encryptedPasswords) => {
  try {
    // console.log(password);
    // console.log(encryptedPasswords);
    const compare = await bcrypt.compare(password, encryptedPasswords);
    // console.log(compare);
    return compare;
  } catch (error) {
    return {
      status: 500,
      messsage: error.message,
      data: null,
    };
  }
};

module.exports = {
  DecodePassword,
  comparePasswords,
};
