const { GraphQLError } = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')

const typeDefs = `
	type Author {
		name: String!
		bookCount: Int!
		born: Int
		id: ID!
	}

  type Query {
		authorCount: Int!
		allAuthors: [Author!]!
  }

	type Mutation {
		editAuthor(name: String!, setBornTo: Int!): Author
	}
`

const resolvers = {
  Query: {
    authorCount: async () => (await Author.find({})).length,
    allAuthors: async (...args) => await Author.find({}),
  },
  Author: {
    bookCount: async (root) => (await Book.find({ author: root.id })).length,
  },
  Mutation: {
    editAuthor: async (root, args, { loggedUser }) => {
      if (!loggedUser) {
        throw new GraphQLError('Only authenticated users can edit an Author', {
          extensions: {
            code: 'AUTH_FAIL',
          },
        })
      }

      let author = await Author.findOne({ name: args.name })
      if (!author) {
        throw new GraphQLError('Invalid author', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: [{ invalidAuthorName: args.name }],
          },
        })
      }
      await author.updateOne({ born: args.setBornTo }, { new: true })
      return author
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
