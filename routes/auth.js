const express = require('express')
const axios =  require('axios')
const router = express.Router()

const url = 'http://localhost:8002'

router.post('/join', async (req, res, next)=>{
    const {email, nick, password} = req.body
    const response = await axios.post(`${url}/api/auth/join`, {
        email, nick, password
    })
    if(response.status === 201){
        res.redirect('/')
    }else{
        res.redirect('/join')
    }
    
})

router.post('/login', async (req, res, next)=>{
    const {email, password} = req.body
    console.log(email, password)

    const response = await axios.post(`${url}/api/auth/login`,{
        email, password
    })

    if(response.status === 200){
        req.session.jwt = response.data.token
        return res.redirect('/afterLogin')
    }else{
        return res.redirect('/')
    }
})

router.get('/logout', (req, res, next)=>{
    req.session.destroy()
    return res.redirect('/')
})

module.exports=router