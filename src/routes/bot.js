const express = require('express');
const bot = require('../controllers/BotSearch');
require('dotenv').config()
const app = express();

app.use('/consigna_bot', async (req,res) => {

  await bot().then((value) => {
    console.log(value)
    return res.send('bot')
  })
  .catch((error) => console.log("ERRO"));

    res.send({
      "1 Video" : ""
    })

})