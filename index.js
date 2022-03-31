const express = require('express')
const myApp = express()
const bodyParser = require('body-parser')
myApp.use(bodyParser.json({ limit: '50mb', extended: true }));
myApp.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));

const routes = require("./api/routes.js");

routes(myApp);

myApp.listen(8080, () => {
    console.log('Serveur à l\'écoute')
  })