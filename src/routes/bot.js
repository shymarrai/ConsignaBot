const express = require('express');
const bot = require('../controllers/BotSearch');
const User = require('../model/Users')
const router = express.Router();
const auth = require('../controllers/AuthController')


router.get('/', auth ,async (req,res) => {
  const selectedUser = await User.findOne({id: req.user.id})


  bot().then((value) => {
    console.log(value)
    res.send(`bot`)
  })
  .catch((error) => console.log("ERRO"));

  return res.send(`Bem Vindo, ${selectedUser.name}`)

})

module.exports = router