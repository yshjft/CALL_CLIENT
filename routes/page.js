const express = require('express')

const router = express.Router()
const TITLE =  'JWT LOGIN'

router.get('/', (req, res, next)=>{
    res.render('index', {
        title: TITLE
    })
})

router.get('/join', (req, res, next)=>{
    res.render('join', {
        title: TITLE
    })
})

router.get('/afterLogin', (req, res, next)=>{
    res.render('afterLogin', {
        title: TITLE
    })
})

module.exports=router