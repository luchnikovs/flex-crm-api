const dotenv = require('dotenv').config()
const jwt = require('jsonwebtoken')
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require('body-parser')
const routes = require('../routes/index')
const {MongoMemoryServer} = require('mongodb-memory-server')
const UserModel = require('../models/user')

const app = express()

app.use(bodyParser.json())
app.use('/', routes)

let mongoServer
const opts = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}

const token = jwt.sign({email: process.env.TEST_USER_EMAIL}, process.env.TOKEN_SECRET, {expiresIn: process.env.TOKEN_EXP})

const createUser = async () => {
  const userData = {
    email: process.env.TEST_USER_EMAIL,
    username: process.env.TEST_USER_NAME,
    password: process.env.TEST_USER_PASSWORD
  }

  await new UserModel(userData).save()
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

module.exports = {app, token, createUser, testDbConnect, testDbDisconnect}
