'use strict';

// This page is needed for testing. Please don't touch it.
// MongoMemoryServer is just like Mongo but it is in memory so you don't have to install anything and it therefore won't cause any issues when you deploy
// You use it the exact same way you would use MongoDB


const { default: MongoMemoryServer } = require('mongodb-memory-server');
const mongoose = require('mongoose');

require('dotenv').config();

const server = require('./src/server.js');

const mongooseOptions = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
  poolSize: 10,
};

const mongoServer = new MongoMemoryServer();

mongoServer.getUri()
  .then((connString) => mongoose.connect(connString, mongooseOptions) )
  .then( () => server.start(process.env.PORT) );
