const express = require('express');
const routes = require('./src/routes/index');
const mongoose = require('mongoose');
var bodyParser = require('body-parser')
require('dotenv').config()


const server = express();
var jsonParser = bodyParser.json()

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

mongoose.connect(process.env.MONGO_CONNECTION_URL, { useUnifiedTopology: true, useNewUrlParser: true },
  (error) => {
    if (error) { console.log(error) }

    else { console.log('Mongo Connected') }

  })

mongoose.set('useFindAndModify', false);

//escolhendo template engine
server.set('view engine', 'ejs')

//habilitador os arquivos static
server.use(express.static("public"))

//usar o req.body
server.use(express.urlencoded({ extend: true }))


//routes
server.use(routes)



server.listen(process.env.PORT, () => console.log('rodando'))

//await page.waitForNavigation()