const { GraphQLError } = require('graphql')
const jsonwebtoken = require('jsonwebtoken')
const User = require('../models/user')

const typeDefs = `
	extend type Query {
		me: User
	}

	extend type Mutation {
		createUser(
    	username: String!
    	favoriteGenre: String!
  	): User
  	login( 
    	username: String!
    	password: String!
  	): Token
	}

	type Token {
		value: String!
	}

	type User {
		username: String!
		favoriteGenre: String!
		id: ID!
	}
`

const resolvers = {
  Query: {
    me: async (root, args, { loggedUser }) => loggedUser,
  },
  Mutation: {
    createUser: async (root, { username, favoriteGenre }) => {
      let newUser = new User({ username, favoriteGenre })

      try {
        newUser = await newUser.save()
      } catch (e) {
        throw new GraphQLError('Creating the user failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.keys(error.errors),
            error,
          },
        })
      }

      return newUser
    },
    login: async (root, { username, password }) => {
      const user = await User.findOne({ username })

      if (!user || password !== 'mysecret') {
        throw new GraphQLError('wrong credentials', {
          extensions: {
            code: 'BAD_USER_INPUT',
          },
        })
      }

      const value = jsonwebtoken.sign(
        { username, id: user._id },
        process.env.JWT_SECRET
      )

      return { value }
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
