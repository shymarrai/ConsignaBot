const express = require('express');
const UserController = require('../controllers/UserController')
require('dotenv').config()
const app = express();

app.get('/', (req,res) => {
  return res.send('login')
})

app.get('/register', UserController.register)
app.post('/register/save', UserController.save)




module.exports = app