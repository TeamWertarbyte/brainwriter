'use strict'

const Hapi = require('hapi')
const loki = require('lokijs')

const sessionRoutes = require('./routes/sessions')

const server = new Hapi.Server()

server.connection({
  port: 3000
})

server.app.db = new loki('loki.json')

server.register([
  sessionRoutes
], (err) => {
  if (err) {
    throw err
  }
  server.start((err) => {
    if (err) {
      throw err
    }
    console.log('Server running at:', server.info.uri)
  })
})
