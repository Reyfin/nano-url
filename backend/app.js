const express = require("express");
const mongoose = require("mongoose");

const nanourlRoutes = require("./routes/routes");
const db = require("./config/default.json").MONGO_URI;
const cors = require('cors');
const app = express();

app.use(cors());
app.options('*',cors());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use("/api", nanourlRoutes);

mongoose
  .connect(db, { useNewUrlParser: true, useUnifiedTopology: true })
  .then((result) => {
    console.log("MongoDB Connected");
    app.listen(5000);
  })
  .catch((err) => {
    console.log("Connection Failed: " + err);
  });
