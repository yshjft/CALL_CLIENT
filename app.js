const express = require('express')
const morgan = require('morgan')
const cookieParser = require('cookie-parser')
const session = require('express-session')
const path = require('path')
const flash =  require('connect-flash')
require('dotenv').config()

const app = express()

app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'ejs')
app.set('port', process.env.PORT || 8001)

app.use(morgan('dev'))
app.use(express.static(path.join(__dirname, 'views')))
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(cookieParser(process.env.COOKIE_SECRET))
app.use(session({
    resave: false,
    saveUninitialized: false,
    secret: process.env.COOKIE_SECRET,
    cookie: {
        httpOnly: true,
        secure: false
    }
}))
app.use(flash()) // 사용하려나??

app.use((req, res, next)=>{
    const err = new Error('Not Found')
    err.status = 404
    next(err)
})

app.use((err, req, res, next)=>{
    res.locals.message = err.nessage
    res.locals.error = req.app.get('env') === 'development' ? err : {}
    res.status(err.status || 500)
    res.render('error')
})

app.listen(app.get('port'), ()=>{
    console.log(app.get('port'), '번 포트에서 대기 중')
})