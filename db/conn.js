const mongoose = require("mongoose");

const DB = process.env.DATABASE;

mongoose.connect(DB,
    {
    useUnifiedTopology:true,
}
).then(()=>console.log("***Connection Successfull ***")).catch((err)=>console.log("error in connection",err))