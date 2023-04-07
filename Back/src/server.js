import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import config  from '../src/config.js';
import mongoose from 'mongoose';

const server = express();

server.use(morgan('tiny'));
server.use(express.json());
server.use(cors())

mongoose.connect(config.mongo.key, {

}).then(() => {console.log("Connected")
}).catch(e => console.log(e))

server.listen(config.server.port, () => {
  console.log(`server is running on: http://${config.server.domain}:${config.server.port}`)
});