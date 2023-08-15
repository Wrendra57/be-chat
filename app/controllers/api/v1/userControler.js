const userService = require("../../../services/userService");
const userRepository = require("../../../repositories/userRepository");
const RegisterUser = async (req, res, next) => {
  try {
    console.log(req.body);

    // console.log(uuid);
    const { email, password, name } = req.body;
    // console.log(email);
    const createUser = await userService.RegisterUser({
      email: email,
      password: password,
      name: name,
    });



    return res.status(createUser.status).json(createUser);
  } catch (error) {
    return;
  }
};

const VerifikasiOTP = async (req, res) => {
  try {
    // console.log(req.params);
    // console.log(req.body);

    const verifikasiOtp = await userService.VerifikasiOTP({
      email: req.body.email,
      otp: req.params.otp,
    });
    return res.status(verifikasiOtp.status).json(verifikasiOtp);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const Login = async (req, res) => {
  try {
    console.log(req.body);
    const Login = await userService.Login({
      email: req.body.email,
      password: req.body.password,
    });

    return res.status(Login.status).json(Login);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const ForgotPassword = async (req, res) => {
  try {
    const forgotPassword = await userService.ForgotPassword({
      email: req.body.email,
    });

    return res.status(forgotPassword.status).json(forgotPassword);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const updatePassword = async (req, res) => {
  try {
    console.log(req.user);
    const updatePassword = await userService.updatePassword({
      uuid: req.user.uuid,
      email: req.user.email,
      newPassword: req.body.newPassword,
    });

    return res.status(updatePassword.status).json(updatePassword);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const authUser = async (req, res, next) => {
  try {
    console.log(req.user);
    const getUser = await userService.GetUserDetail({ uuid: req.user.uuid });
    return res.status(getUser.status).json(getUser);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getUserByName = async (req, res, next) => {
  try {
    const getUser = await userService.getUserByName(req.params.name);
    return res.status(getUser.status).json(getUser);
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = {
  RegisterUser,
  VerifikasiOTP,
  Login,
  ForgotPassword,
  updatePassword,
  authUser,
  getUserByName,
};
