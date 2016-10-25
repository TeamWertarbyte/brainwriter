'use strict'

const Boom = require('boom')
const uuid = require('node-uuid')
const Joi = require('joi')
const shortid = require('shortid')

exports.register = (server, options, next) => {
  const db = server.app.db

  const sessions = db.addCollection('sessions')

  server.route({
    method: 'GET',
    path: '/sessions',
    handler: (request, reply) => {
      reply(sessions.find())
    }
  })

  server.route({
    method: 'GET',
    path: '/sessions/{id}',
    handler: (request, reply) => {
      const key = encodeURIComponent(request.params.id)

      const session = sessions.findOne({
        key
      })

      if (!session) {
        reply(Boom.notFound())
      } else {
        reply(session)
      }
    }
  })

  server.route({
    method: 'POST',
    path: '/sessions',
    handler: (request, reply) => {
      const key = shortid.generate()
      const title = encodeURIComponent(request.query.title)
      const description = encodeURIComponent(request.query.description)

      const session = {
        _id: uuid.v1(),
        key,
        title,
        description,
        state: 0,
        currentRound: 0,
        papers: [],
        result: []
      }
      sessions.insert(session)
      reply(key)
    },
    config: {
      validate: {
        query: {
          title: Joi.string().max(50).required(),
          description: Joi.string().max(140).required()
        }
      }
    }
  })

  return next()
}

exports.register.attributes = {
  name: 'routes-sessions'
}
