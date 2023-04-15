const express = require("express")
// const cors = require('cors')
const morgan = require('morgan')
const config = require('./config/config')
const mongoose = require('mongoose')
const router = require('./router/main.js')
const cookieSession = require("cookie-session")
const corsOptions = require("./config/cors.options")
require('dotenv').config();

const server = express();

server.use(morgan('tiny'));
server.use(express.json());
// server.use(cors(corsOptions))

server.use(
  cookieSession({
    name: 'newface-session',
    secret: 'COOKIE_SECRET',
    httpOnly: true
  })
)

mongoose.connect(config.mongo.key)
    .then(() => {
        console.log('connected')
    }).catch(e => {
    console.log(e)
})

server.use("/", router)

server.listen(config.server.port, () => {
  console.log(`server is running on: http://${config.server.domain}:${config.server.port}`)
});
