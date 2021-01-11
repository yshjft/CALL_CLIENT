const express = require('express')
const axios =  require('axios')
const router = express.Router()

router.post('/join', async (req, res, next)=>{
    const {email, nick, password} = req.body
    console.log(email, nick, password)

    const response = await axios.post('http://localhost:8002/api/auth/join', {
        email, nick, password
    })
    console.log(response.data.message)
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