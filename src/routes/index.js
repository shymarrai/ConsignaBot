const express = require('express');

const UserController = require('../controllers/UserController')
const ClientController = require('../controllers/ClientController')

const botRouter = require('./bot')

require('dotenv').config()
const app = express();

app.get('/', UserController.logar)
app.post('/', UserController.login)

app.get('/register', UserController.register)
app.post('/register',UserController.save)

app.use('/principal/:user/:token/:values',UserController.principal)


// app.post('/consigna_bot', botRoutes.getParams)
app.use('/consigna_bot/:user/:token',botRouter.getParams)
app.get('/get_bot/:cpf/:user/:token', botRouter.getBot)



app.post('/save_data_client/:user/:token', ClientController.save)


// app.get('/consigna_bot/:cpf', botRoutes.getBot)

app.use('/logout',UserController.logout)




module.exports = app