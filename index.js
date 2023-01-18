const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const morgan = require("morgan");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { AppError } = require("./helpers/AppError");
dotenv.config();
// <------------------------------------------------------Middleware-------------------------------------------------->
app.use(morgan("dev"));

app.use(cors());
app.use(bodyParser.json());

app.use((req, res, next) => {
  const info = req.method + " " + res.statusCode + " " + req.url;
  console.log("API HIT -------------->", info, "\n|\nv\n|\nv\n");
  if (!req.header("lang") || req.header("lang") == "") req.lang = "en";
  else req.lang = req.header("lang");
  next();
});

const route = require("./routes");

app.use("/v1", route);

app.all("*", (req, res) => {
  throw new AppError(`Requested URL ${req.path} not found 🫡`, 404);
});

// <--------------------------------------------------Data Base (MONGO_DB) Connection--------------------------------------------->
// mongoose
//   .connect(config.DB_URL, {
//     useUnifiedTopology: true,
//     useNewUrlParser: true,
//   })
//   .then((result) => {
//     console.log("===== Connected to MongoDB =====");
//   })
//   .catch((err) => {
//     throw new Error("MongoDB Connection Error!", err);
//     console.log(err);
//   });

app.listen(process.env.PORT, process.env.HOST, () => {
  console.log(
    `APP LISTENING ON http://${process.env.HOST}:${process.env.PORT}`
  );
});
