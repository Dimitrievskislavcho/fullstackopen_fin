const { GraphQLError, subscribe } = require('graphql')
const Book = require('../models/book')
const Author = require('../models/author')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const typeDefs = `
	extend type Query {
		bookCount: Int!
		allBooks(author: String, genre: String): [Book!]!
		allGenres: [String!]!
	}

	extend type Mutation {
		addBook(
			title: String!,
			published: Int!,
			author: String!,
			genres: [String!]!
		): Book!
	}

	type Subscription {
		bookAdded: Book!
	}

	type Book {
		title: String!
		published: Int!
		author: Author!
		id: ID!
		genres: [String!]!
	}
`

const resolvers = {
  Query: {
    bookCount: async () => (await Book.find({})).length,
    allBooks: async (root, { genre }) => {
      if (genre) {
        return await Book.find({ genres: genre }).populate('author')
      }

      return await Book.find({}).populate('author')
    },
    allGenres: async () => {
      const books = await Book.find({})
      const genres = books.reduce(
        (genres, { title, genres: bookGenres = [] }) =>
          genres.concat(bookGenres),
        []
      )

      const uniqueGenres = [...new Set(genres)].concat('all genres')
      return uniqueGenres
    },
  },
  Mutation: {
    addBook: async (root, args, { loggedUser }) => {
      let newBook = { ...args }
      let author
      if (!loggedUser) {
        throw new GraphQLError('Only authenticated users can add a new book', {
          extensions: {
            code: 'AUTH_FAIL',
          },
        })
      }

      try {
        author = await Author.findOne({ name: args.author })
        if (!author) {
          author = await new Author({ name: args.author }).save()
        }
        const createdBook = await new Book({
          ...newBook,
          author: author.id,
        }).save()
        newBook.id = createdBook.id
      } catch (error) {
        throw new GraphQLError('Saving a book failed', {
          extensions: {
            code: 'BAD_USER_INPUT',
            invalidArgs: Object.keys(error.errors),
            error,
          },
        })
      }
      const bookAdded = { ...newBook, author }

      pubsub.publish('BOOK_ADDED', { bookAdded })

      return bookAdded
    },
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator('BOOK_ADDED'),
    },
  },
}

module.exports = {
  typeDefs,
  resolvers,
}
