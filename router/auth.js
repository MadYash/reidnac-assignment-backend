const express = require("express");
const router = express.Router();
require("../db/conn");
const cors = require("cors");
const bcrypt = require("bcrypt");

const User = require("../model/userSchema");
//Middleware
const middleware = (req, res, next) => {
  console.log("Middleware in the house");
  next();
};
router.get("/", (req, res) => {
  res.send("Hello world from the server");
});
router.get("/about", middleware, (req, res) => {
  res.send("Hello world from the About");
});

router.use(cors());
router.use(express.json()); // parsing the json data

//Hashing through Bcrypt libarary (c++ one)
router.post("/register", async (req, res) => {
  const { name, email, phone, password, cpassword, role } = req.body;

  if (!name || !email || !phone || !password || !cpassword) {
    return res
      .status(422)
      .json({ error: "Required Fields can not be left blank !" });
  } else if (password !== cpassword) {
    return res.status(422).json({ error: "Password Must Match !" });
  }

  const hashPwd = await bcrypt.hash(password, 12); // To hash the password
  const hashCPwd = await bcrypt.hash(cpassword, 12); // To hash the confirm password

  try {
    const userExist = await User.findOne({ email: email });
    if (userExist) {
      return res.status(400).json({ error: "User Already Exist", status: 400 });
    }
    const user = new User({
      name,
      email,
      phone,
      password: hashPwd,
      cpassword: hashCPwd,
      role,
    });
    const userRegister = await user.save();
    if (userRegister) {
      return res
        .status(200)
        .json({ msg: "Registration Successfull !", status: 200 });
    } else {
      res.status(403).json({ error: "Failed to registered" });
    }
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    res.status(402).json({ error: "Please fill the field correctly" });
  }

  try {
    const userExist = await User.findOne({ email: email });
    console.log(userExist)

   
     if (userExist) {
      const isMatch = await bcrypt.compare(password, userExist.password); // To match the current password with hashed password
      const token = await userExist.generateToken();
      if (userExist && isMatch) {
        res
          .cookie("jwt", token, {
            expires: new Date(Date.now() + 50000),
            httpOnly: true,
          })
          .status(200)
          .json({ msg: "Logged in successfully", status: 200, token: userExist.tokens[0] });
      }
    } 
    else  if (userExist === null) {
      res.status(422).json({ error: "User Does not exist", status: 422 });
    } 
    else {
      res.status(400).json({ error: "Invalid Credentials", status: 400 });
    }
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
