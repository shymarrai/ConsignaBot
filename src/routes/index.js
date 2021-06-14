const express = require('express');
const UserController = require('../controllers/UserController')
const botRouter = require('./bot')



require('dotenv').config()
const app = express();

app.get('/', UserController.logar)
app.post('/', UserController.login)

app.get('/register', UserController.register)
app.post('/register',UserController.save)

app.use('/consigna_bot', botRouter)


module.exports = app