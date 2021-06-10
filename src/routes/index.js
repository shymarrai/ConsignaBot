const express = require('express');
require('dotenv').config()
const app = express();

app.use('/', (req,res) => {
  return res.send('TELA DE LOGIN')
})




module.exports = app