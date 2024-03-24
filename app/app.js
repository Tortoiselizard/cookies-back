require('dotenv').config({ path: '.env.local'})
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { PATH_FRONT, DOMINE } = process.env
console.log('PATH_FRONT:', PATH_FRONT)

const app = express()

// app.use(cors({
//     origin: [ `${PATH_FRONT2}` , `${PATH_FRONT}`],
//     credentials: true
// }))
app.use((req, res, next) => {
    console.log('cookie:', req.headers.cookie)
    next()
})
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', `${PATH_FRONT}`)
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE')
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type')
    res.setHeader('Access-Control-Allow-Credentials', true)
    next()
})
app.use(morgan('dev'))

app.get('/', async (req, res) => {
    res.status(200).json('Esto es una api para las cookies!')
})

app.get('/cookie', async (req, res) => {
    const cookie = `myCookie=galleta; SameSite=None; Secure`
    console.log('cookie:', cookie)
    res.setHeader('Set-Cookie', cookie)
    res.status(200).json('Acabas de solicitar una cookie')
})

app.get('/noCookie', async(req,res) => {
    res.status(200).json('Esta es una ruta libre de cookies')
})

module.exports = app