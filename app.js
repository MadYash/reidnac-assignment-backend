const express = require("express");
const dotenv = require("dotenv");
const app = express();
dotenv.config({ path: "./config.env" });
require("./db/conn");
const cors = require("cors");
const port = process.env.port;
// const User = require("./model/userSchema")

//Linking router files
app.use(require("./router/auth"));
app.use(require('./router/analytics'))
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json()); //to convert the data in JSON
app.listen(port, () => {
  console.log(`server is listening at ${port}`);
});
