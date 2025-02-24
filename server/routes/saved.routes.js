const express=require('express')
const router=express.Router()
const savedController=require('../controller/saved.controller')

router.post('/saved',savedController.save)
router.get('/saved/:id',savedController.saved)

module.exports=router