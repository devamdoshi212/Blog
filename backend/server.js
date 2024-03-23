const express = require("express");
const cors = require("cors");
const { interceptor } = require("./middlewares/interceptor");
const { errorHandler } = require("./controllers/errorController");

const app = express();
require("dotenv").config();
app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(interceptor);
app.use(errorHandler);
const server = app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
