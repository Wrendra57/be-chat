/**
 * @file Bootstrap express.js server
 * @author Fikri Rahmat Nurhidayat
 */

const express = require("express");
const morgan = require("morgan");
const router = require("../config/routes");
const cors = require("cors");
const app = express();
app.use(cors(false));
/** Install request logger */
app.use(morgan("dev"));

/** Install JSON request parser */
app.use(express.json());

/** Install Router */
app.use(router);

module.exports = app;
