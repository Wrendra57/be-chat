const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");

exports.parseToken = async (req, res, next) => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        code: 401,
        status: "Token not found",
        data: null,
      });
    }
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    if (decoded == null) {
      return res.status(401).json({
        code: 401,
        message: "Unautorized access",
        data: null,
      });
    } else {
      console.log("success");
      req.user = decoded;
      console.log(decoded);
      next();
    }
  } catch (error) {
    console.log(error);
    return res.status(403).json({
      code: 403,
      status: "Token expired",
      data: null,
    });
  }
};
