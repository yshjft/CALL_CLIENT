const express = require('express')

const router = express.Router()

router.post('/join', (req, res, next)=>{
    const {email, nick, password} = req.body
    console.log(email, nick, password)

    res.redirect('/join')
})

router.post('/login', (req, res, next)=>{
    const {email, password} = req.body
    console.log(email, password)
    
    res.redirect('/')
})

router.get('/logout', (req, res, next)=>{
    res.redirect('/')
})

module.exports=router