const express = require('express');
const routes = require('./src/routes/index');
const mongoose = require('mongoose');
require('dotenv').config()

const server = express();


mongoose.connect(process.env.MONGO_CONNECTION_URL, {useUnifiedTopology: true, useNewUrlParser: true},
  (error) => {
  if(error){console.log(error)}
      
  else{console.log('Mongo Connected')}
      
  })



//escolhendo template engine
server.set('view engine', 'ejs')

//habilitador os arquivos static
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({extend: true}))


//routes
server.use(routes)



server.listen(3000, () => console.log('rodando'))

//await page.waitForNavigation()