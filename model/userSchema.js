const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    // require: true
  },
  email: {
    type: String,
    // require: true,
  },
  phone: {
    type: Number,
    // require: true,
  },
  password: {
    type: String,
    // require: true,
  },
  cpassword: {
    type: String,
    // require: true,
  },
  role: {
    type: String,
  },
  tokens: [
    {
      token: {
        type: String,
        required: true,
      },
    },
  ],
});

// Through bcrypt.js
// userSchema.pre("save",async function (next) {
//     if(this.isModified("password")){
//         this.password = await bcrypt.hash(this.password,12)
//         this.cpassword = await bcrypt.hash(this.cpassword,12)
//     }
//     next()
// })

userSchema.methods.generateToken = async function () {
  try {
    let token = jwt.sign({ _id: this._id }, process.env.SECRET_KEY);
    this.tokens = this.tokens.concat({ token: token });
    await this.save();
    return token;
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("USER", userSchema);
module.exports = User;
