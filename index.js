const express = require('express');
const Login = require('./src/routes/index');
require('dotenv').config()
const server = express();

server.use('/', Login)




server.listen(3000, () => console.log('rodando'))

// //await page.waitForNavigation()