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
router.use(cors());
router.use(express.json()); // parsing the json data

router.get("/analytics",(req,res)=>{
    const data = {
        months:["January", "February", "March", "April", "May", "June", "July"],
        companyOne : "Samsung S23",
        companyTwo : "Iphone 15",
    }
    res.send(data)
})



module.exports = router;
