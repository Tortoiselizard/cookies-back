require('dotenv').config({ path: '.env.local'})
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')

const { PATH_FRONT, PATH_BACK } = process.env
console.log('PATH_FRONT:', PATH_FRONT)

const app = express()
app.use(express.json())
// app.use(cors({
//     origin: [ `${PATH_FRONT2}` , `${PATH_FRONT}`],
//     credentials: true
// }))
app.use((req, res, next) => {
    const cookie = req.headers.cookie
    console.log('cookie:', cookie)
    req.myCookie = cookie
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
    const myCookie = req.myCookie
    console.log('myCookie:', myCookie)
    res.status(200).json(`Esto es una api para las cookies! La cookie que me llego es: ${myCookie}`)
})

app.get('/simulateAuth', async (req, res) => {
    console.log('haciendo la redirección al servior de google')
    res.redirect(`${PATH_BACK}/redirectionToC`)
})

app.get('/redirectionToC', async (req, res) => {
    console.log('encontre el valor de user')
    const cookie = `myCookie=galleta de simulacion; SameSite=None; Secure`
    console.log('cookie:', cookie)
    res.setHeader('Set-Cookie', cookie)
    res.redirect(`${PATH_FRONT}`)
})

app.get('/redirectionToA', async (req, res) => {
    console.log('pasando por la redirección A')
    // res.status(200).json('Estas en la redirección A!')
    res.redirect(`${PATH_BACK}/redirectionToB`)
})

app.get('/redirectionToB', async (req, res) => {
    console.log('pasando por la redirección B')
    const cookie = `myCookie=galleta de redireccion; SameSite=None; Secure`
    console.log('cookie:', cookie)
    res.setHeader('Set-Cookie', cookie)
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

app.post('/cookie-back', async (req, res) => {
    const { cookie } = req.body
    console.log('body:', req.body)
    console.log('cookie proveniente del front:', cookie)
    res.setHeader('Set-Cookie', cookie)
    // res.status(200).json('Desde el back, estoy mandando la cookie que me pasaste del front')
    res.status(200).json('ya agregué la cookie en el header de esta respuesta')
})

module.exports = app