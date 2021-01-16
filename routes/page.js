const express = require('express')
const axios =  require('axios')
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

router.get('/afterLogin', async(req, res, next)=>{
    if(!req.session.jwt){
        return res.redirect('/')
    }else{
        try{
            const response = await axios.get('http://localhost:8002/api/user/myData', {
                headers: {authorization: req.session.jwt}
            })

            if(response.status === 200){
                const {nick, email} = response.data
                return res.render('afterLogin', {
                    title: TITLE,
                    nick,
                    email
                })
            }
        }catch(error){
            if(error.response.status === 419){
                console.log('response = ', error.response.data)
                req.session.destroy()
                return res.redirect('/')
            }
        }
    }  
})

module.exports=router