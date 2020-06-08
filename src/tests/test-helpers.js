const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('../routes/index')
const {MongoMemoryServer} = require('mongodb-memory-server')

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

let mongoServer
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const testDbConnect = async () => {
  mongoServer = new MongoMemoryServer()
  const mongoUri = await mongoServer.getUri()
  await mongoose.connect(mongoUri, opts, (err) => {
    if (err) console.error(err)
  })
}

const testDbDisconnect = async () => {
  await mongoose.disconnect()
  await mongoServer.stop()
}

module.exports = {app, testDbConnect, testDbDisconnect}
