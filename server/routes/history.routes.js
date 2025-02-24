const express=require('express')
const router=express.Router()
const historycontroller=require("../controller/history.controller")
router.post("/history",historycontroller.saveHistory)
router.get("/history/:id",historycontroller.getHistory)
module.exports=router
