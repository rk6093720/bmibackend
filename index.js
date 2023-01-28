const express = require("express");
const cors = require("cors");
const { connection } = require("./config/db");
const { UserProfilerouter } = require("./routes/userProfile.routes");
const { signuprouter } = require("./routes/signup.routes");

const { loginRouter } = require("./routes/login.routes");

require("dotenv").config();
const port_no = process.env.PORT || 8080;
const app = express();
app.use(cors());
app.use(express.json());
app.use("/login", loginRouter);
app.use("/signup", signuprouter);
app.use("/user", UserProfilerouter);
app.get("/", (req, res) => {
  res.send("welcome");
});
app.listen(port_no, async () => {
  try {
    await connection;
    console.log("database connected");
  } catch (err) {
    console.log(err.message);
  }
  console.log("listening on port no", port_no);
});