const { ApolloServer } = require('@apollo/server')
const express = require('express')
const cors = require('cors')
const http = require('http')
const mongoose = require('mongoose')
const User = require('./models/user')
const jsonwebtoken = require('jsonwebtoken')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const {
  resolvers: userResolvers,
  typeDefs: userTypeDefs,
} = require('./definitions/user')
const {
  resolvers: bookResolvers,
  typeDefs: bookTypeDefs,
} = require('./definitions/book')
const {
  resolvers: authorResolvers,
  typeDefs: authorTypeDefs,
} = require('./definitions/author')
const { mergeResolvers, mergeTypeDefs } = require('@graphql-tools/merge')
const {
  ApolloServerPluginDrainHttpServer,
} = require('@apollo/server/plugin/drainHttpServer')
const { expressMiddleware } = require('@apollo/server/express4')

require('dotenv').config()

mongoose.set('strictQuery', false)
mongoose
  .connect(process.env.MONGODB_URI)
  .then(() => {
    console.log('connected to MongoDB')
  })
  .catch((error) => {
    console.log('error connection to MongoDB:', error.message)
  })

mongoose.set('debug', true)

const typeDefs = `
  type Query {
		_identity: String
	}

	type Mutation {
		_identity: String
	}
`

async function startServer() {
  const app = express()
  const httpServer = http.createServer(app)
  const schema = makeExecutableSchema({
    typeDefs: mergeTypeDefs([
      typeDefs,
      userTypeDefs,
      bookTypeDefs,
      authorTypeDefs,
    ]),
    resolvers: mergeResolvers([userResolvers, bookResolvers, authorResolvers]),
  })
  const wsServer = new WebSocketServer({
    server: httpServer,
    path: '/',
  })
  const serverCleanup = useServer({ schema }, wsServer)
  const server = new ApolloServer({
    schema,
    plugins: [
      ApolloServerPluginDrainHttpServer({ httpServer }),
      {
        async serverWillStart() {
          return {
            async drainServer() {
              await serverCleanup.dispose()
            },
          }
        },
      },
    ],
  })

  await server.start()

  app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.startsWith('Bearer ')) {
          const decodedToken = jsonwebtoken.verify(
            auth.substring(7),
            process.env.JWT_SECRET
          )
          const loggedUser = await User.findById(decodedToken.id)
          return { loggedUser }
        }
      },
    })
  )

  const PORT = 4000

  httpServer.listen(PORT, () =>
    console.log(`Server is now running on http://localhost:${PORT}`)
  )
}

startServer()
