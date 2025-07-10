const express = require('express')

const router = express.Router()

router.get('/',(req,res)=>{
    res.json({mssg:"GET all expenses"})

})

router.get('/:id',(req,res)=>{
    res.json({mssg:"GET a Single expense"})

})

router.post('/',(req,res)=>{
    res.json({mssg:"POST a new expenses"})

})

router.delete('/:id',(req,res)=>{
    res.json({mssg:"DELETE a expense"})

})

router.patch('/:id',(req,res)=>{
    res.json({mssg:"UPDATE the expenses"})

})
module.exports = router
