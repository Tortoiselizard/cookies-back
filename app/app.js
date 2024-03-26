require('dotenv').config({ path: '.env.local'})
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { PATH_FRONT, PATH_BACK } = process.env
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

app.get('/redirectionToA', async (req, res) => {
    console.log('pasando por la redirección A')
    // res.status(200).json('Estas en la redirección A!')
    res.redirect(`${PATH_BACK}/redirectionToB`)
})

app.get('/redirectionToB', async (req, res) => {
    console.log('pasando por la redirección B')
    res.status(200).json('Estas en una redirección B!')
})

app.get('/cookie', async (req, res) => {
    const cookie = `myCookie=galleta; SameSite=None; Secure`
    console.log('cookie:', cookie)
    res.setHeader('Set-Cookie', cookie)
    res.status(200).json('Acabas de solicitar una cookie')
})

app.get('/noCookie', async(req,res) => {
    const cookie = `myCookie=; SameSite=None; Secure; Max-Age=0`
    console.log('cookie:', cookie)
    res.setHeader('Set-Cookie', cookie)
    res.status(200).json('Se eliminará tu cookie')
})

app.post('/addCustomHeader', async (req, res) => {
    res.setHeader('galleta', 'galleta de poder')
    res.status(200).json('Ya agregué una cookie a mi página')
})

module.exports = app