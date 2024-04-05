require("dotenv").config();
const express = require("express");
const cors = require("cors");
const {
  CustomError,
  asyncRouteHandler,
  interceptor,
} = require("./utils/router-utils");
const { errorHandler } = require("./controllers/errorController");
const { dbConnect } = require("./utils/database-utils");

const adminRoutes = require("./routes/admin-routes");
const userRoutes = require("./routes/user-routes");
const { login } = require("./controllers/common-controller");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.use(interceptor);

app.post("/login", asyncRouteHandler(login));

app.use("/admin", adminRoutes);
app.use("/user", userRoutes);

app.all("*", (req, res, next) => {
  next({ message: "Invalid Route", stack: "app.js" });
});

app.use(errorHandler);

dbConnect()
  .then(() => {
    // addAdmin();
    app.listen(process.env.PORT, () => {
      console.log(`http://localhost:${process.env.PORT}`);
    });
  })
  .catch((err) => {
    console.log(err.message);
  });
