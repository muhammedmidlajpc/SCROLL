const mongoose = require('mongoose')
const dbconnect=()=>{
    mongoose.connect(process.env.MONGODB_URI)
    .then((res)=>console.log("Database is connected"))
    .catch((err)=>console.log(err))
}

module.exports=dbconnect;