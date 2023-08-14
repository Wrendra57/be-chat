const path = require("path");
const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");
const SendEmail = async ({ address, subject, template, isi }) => {
  try {
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "secondhandnotification@gmail.com",
        pass: "nxwhxdbupsxuaitf",
      },
    });
    const handlebarOptions = {
      viewEngine: {
        extName: ".handlebars",
        partialsDir: path.resolve("./app/mailTemplate"),
        defaultLayout: false,
      },
      viewPath: path.resolve("./app/mailTemplate"),
      extName: ".handlebars",
    };
    transporter.use("compile", hbs(handlebarOptions));

    const mailOptions = {
      from: "Notifications",
      to: address,
      subject: subject,
      template: template,
      context: {
        isi: isi,
      },
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    });
  } catch (error) {
    console.log(error);
    return {
      status: 500,
      message: error.message,
      data: null,
    };
  }
};

module.exports = {
  SendEmail,
};
