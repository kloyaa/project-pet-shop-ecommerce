require("dotenv").config();
const port = process.env.PORT || 5000;
const express = require("express");
const multer = require("multer");
const mongoose = require("mongoose");
const cors = require('cors')
const app = express();

const { fileFilter, storage } = require("./services/img-upload/fileFilter");

try {
  mongoose
    .connect(process.env.CONNECTION_STRING)
    .then((value) => console.log("SERVER IS CONNECTED"))
    .catch(() => console.log("SERVER CANNOT CONNECT"));

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(multer({ storage, fileFilter }).single("img"));

  app.use("/api", require("./routes/routeUser"));
  app.use("/api", require("./routes/routeProfile"));
  app.use("/api", require("./routes/routeProduct"));
  app.use("/api", require("./routes/routeCheckout"));
  app.use("/api", require("./routes/routeTicket"));
  app.use("/api", require("./routes/routeCart"));
  app.use("/api", require("./routes/routeStatistics"));
  app.use("/api", require("./routes/routeMonetization"));
  app.use("/api", require("./controllers/uploadController"));

  app.listen(port, () => console.log(`SERVER IS NOW RUNNING ON ${port}`));
} catch (error) {
  console.log(error);
}
