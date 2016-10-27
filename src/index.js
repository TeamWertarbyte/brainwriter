'use strict'

const Hapi = require('hapi')
const loki = require('lokijs')
const Inert = require('inert')
const Vision = require('vision')
const HapiSwagger = require('hapi-swagger')

const sessionRoutes = require('./routes/sessions')

const server = new Hapi.Server()

server.connection({
  port: 3000
})

server.app.db = new loki('loki.json')

server.register([
    Inert,
  Vision,
  {
    'register': HapiSwagger,
    'options': {
        info: {
            'title': 'Test API Documentation'
        }
    }
  },
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
