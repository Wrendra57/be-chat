const UserRepository = require("../repositories/userRepository");
const Bcrypt = require("../utils/bycrypt");
const { otpGen } = require("otp-gen-agent");
const EmailService = require("./emailService");
const jwt = require("jsonwebtoken");
const { JWT } = require("../lib/constant");
const UUID = require("../utils/uuid");
const RegisterUser = async ({ email, password, name }) => {
  // console.log(email);
  try {
    if (name === "") {
      return {
        status: 400,
        message: "Nama tidak boleh kosong",
        data: null,
      };
    }
    if (email === "") {
      return {
        status: 400,
        message: "Email tidak boleh kosong",
        data: null,
      };
    } else {
      if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(email)) {
        return {
          status: 400,
          message: "Email tidak valid",
          data: null,
        };
        return;
      }
    }
    if (password === "") {
      return {
        status: 400,
        message: "Password tidak boleh kosong",
        data: null,
      };
    }

    const emailCheck = await UserRepository.findByEmail(email);
    if (emailCheck) {
      return {
        status: 400,
        message: "Email already exists",
        data: email,
      };
    }

    const uuid = await UUID.Generate();
    // console.log(password);
    const otp = await otpGen();
    // console.log(otp);
    const hassedpassword = await Bcrypt.DecodePassword(password);

    const createUser = await UserRepository.CreateUser({
      uuid: uuid,
      email: email,
      enabled: false,
      otp: otp,
      password: hassedpassword,
      name: name,
      avatar:
        "https://res.cloudinary.com/dhtypvjsk/image/upload/v1691732035/nopicture_u5efnz.png",
    });
    const sendOTP = await EmailService.SendEmail({
      address: createUser.email,
      subject: "Kode OTP",
      template: "sendOTP",
      isi: createUser.otp,
    });
    user = JSON.parse(JSON.stringify(createUser));
    delete user.password;
    return {
      status: 200,
      message: "succses create data",
      data: user,
    };
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const VerifikasiOTP = async ({ email, otp }) => {
  try {
    // console.log(email);
    // console.log(otp);

    const checkEmail = await UserRepository.findByEmail(email);
    // console.log(checkEmail);
    if (!checkEmail) {
      return {
        status: 400,
        message: "Email not found",
        data: null,
      };
    }
    if (!checkEmail.otp || checkEmail.enabled === true) {
      return {
        status: 200,
        message: "Akun sudah diverikasi silahkan Login",
        data: null,
      };
    }

    if (checkEmail.otp !== parseInt(otp)) {
      return {
        status: 400,
        message: "Kode OTP salah",
        data: null,
      };
    }
    // console.log("sini");
    const updateArgs = {
      otp: null,
      enabled: true,
    };
    const verifikasiOTP = await UserRepository.updateByEMail(email, updateArgs);
    // console.log(verifikasiOTP);

    return {
      status: 200,
      message: "succses verif otp",
      data: verifikasiOTP,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const Login = async ({ email, password }) => {
  try {
    // console.log(email);
    // console.log(password);

    const getUser = await UserRepository.findByEmail(email);
    // console.log(getUser);

    if (!getUser) {
      return {
        status: 400,
        message: "Email not found",
        data: null,
      };
    }
    if (!getUser.password) {
      return {
        status: 400,
        message: "Akun ini belum melakukan setup password.",
        data: null,
      };
    }
    if (getUser.enabled === false) {
      return {
        status: 400,
        message: "Akun ini belum melakukan verifikasi.",
        data: null,
      };
    }

    const comparePasswords = await Bcrypt.comparePasswords(
      password,
      getUser.password
    );

    if (!comparePasswords) {
      return {
        status: 400,
        message: "Passwords do not match",
        data: null,
      };
    }

    const token = jwt.sign(
      {
        uuid: getUser.uuid,
        email: getUser.email,
      },
      JWT.SECRET,
      {
        expiresIn: JWT.EXPIRED,
      }
    );
    console.log(token);
    return {
      status: 200,
      message: "Success Logged in",
      data: { token: token, uuid: getUser.uuid },
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const ForgotPassword = async ({ email }) => {
  try {
    const getUser = await UserRepository.findByEmail(email);
    // console.log(getUser);
    // const forgotPassword = await
    if (!getUser) {
      return {
        status: 400,
        message: "Email not found",
        data: null,
      };
    }
    if (!getUser.password) {
      return {
        status: 400,
        message: "Akun ini belum melakukan setup password.",
        data: null,
      };
    }
    if (getUser.enabled === false) {
      return {
        status: 400,
        message: "Akun ini belum melakukan verifikasi.",
        data: null,
      };
    }
    const token = jwt.sign(
      {
        uuid: getUser.uuid,
        email: getUser.email,
      },
      JWT.SECRET,
      {
        expiresIn: JWT.EXPIRED,
      }
    );
    // console.log(token);
    const sendEmail = await EmailService.SendEmail({
      address: getUser.email,
      subject: "Reset Password",
      template: "sendForgotPassword",
      isi: token,
    });
    // console.log(sendEmail);
    return {
      status: 200,
      message: "Success Send Email Forgot Password",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const updatePassword = async ({ uuid, email, newPassword }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    // console.log(getUser);
    if (!getUser) {
      return {
        status: 400,
        message: "Email not found",
        data: null,
      };
    }
    if (!getUser.password) {
      return {
        status: 400,
        message: "Akun ini belum melakukan setup password.",
        data: null,
      };
    }
    if (getUser.enabled === false) {
      return {
        status: 400,
        message: "Akun ini belum melakukan verifikasi.",
        data: null,
      };
    }
    const comparePasswords = await Bcrypt.comparePasswords(
      newPassword,
      getUser.password
    );
    // console.log(comparePasswords);
    if (comparePasswords) {
      return {
        status: 400,
        message: "Password baru tidak boleh sama dengan pasword sebelumnya.",
        data: null,
      };
    }

    const encodeNewPassword = await Bcrypt.DecodePassword(newPassword);
    // console.log(encodeNewPassword);
    const updateArgs = {
      password: encodeNewPassword,
    };
    const updatePassword = await UserRepository.updateByUuid(uuid, updateArgs);
    // console.log(updatePassword);
    return {
      status: 200,
      message: "password updated successfully",
      data: null,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const GetUserDetail = async ({ uuid }) => {
  try {
    const getUser = await UserRepository.findByUuid(uuid);
    delete getUser.password;
    // console.log(getUser.password);
    user = JSON.parse(JSON.stringify(getUser));
    delete user.password;
    // console.log(user);
    return {
      status: 200,
      message: "success get details",
      data: user,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

const getUserByName = async (name) => {
  try {
    const getUser = await UserRepository.findByName(name);
    // console.log(getUser);
    return {
      status: 200,
      message: "success find user",
      data: getUser,
    };
  } catch (error) {
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};
module.exports = {
  GetUserDetail,
  RegisterUser,
  VerifikasiOTP,
  Login,
  ForgotPassword,
  updatePassword,
  getUserByName,
};
