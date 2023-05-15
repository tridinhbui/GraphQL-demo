const express = require('express');
const graphqlHTTP = require('express-graphql').graphqlHTTP;
console.log(graphqlHTTP);
const { GraphQLSchema, GraphQLObjectType, GraphQLString, GraphQLList, GraphQLNonNull, GraphQLInt } = require('graphql');
const app = express();

const books = [
    {
        id: 1,
        name: "To Kill a Mockingbird",
        author: "Harper Lee"
    },
    {
        id: 2,
        name: "1984",
        author: "George Orwell"
    },
    {
        id: 3,
        name: "Pride and Prejudice",
        author: "Jane Austen"
    },
    {
        id: 4,
        name: "The Great Gatsby",
        author: "F. Scott Fitzgerald"
    },
    {
        id: 5,
        name: "The Catcher in the Rye",
        author: "J.D. Salinger"
    },
    {
        id: 6,
        name: "Harry Potter and the Sorcerer's Stone",
        author: "J.K. Rowling"
    },
    {
        id: 7,
        name: "The Lord of the Rings",
        author: "J.R.R. Tolkien"
    },
    {
        id: 8,
        name: "To Kill a Kingdom",
        author: "Alexandra Christo"
    },
    {
        id: 9,
        name: "The Alchemist",
        author: "Paulo Coelho"
    },
    {
        id: 10,
        name: "The Hunger Games",
        author: "Suzanne Collins"
    }
]

const authors = [
    {
        id: 1,
        name: "Harper Lee"
    },
    {
        id: 2,
        name: "George Orwell"
    },
    {
        id: 3,
        name: "Jane Austen"
    },
    {
        id: 4,
        name: "F. Scott Fitzgerald"
    },
    {
        id: 5,
        name: "J.D. Salinger"
    },
    {
        id: 6,
        name: "J.K. Rowling"
    },
    {
        id: 7,
        name: "J.R.R. Tolkien"
    },
    {
        id: 8,
        name: "Alexandra Christo"
    },
    {
        id: 9,
        name: "Paulo Coelho"
    },
    {
        id: 10,
        name: "Suzanne Collins"
    }
]

const BookType = new GraphQLObjectType({
    name: 'Book',
    description: 'Books by author',
    fields: () => (
        {
            id: { type: GraphQLNonNull(GraphQLInt) },
            name: { type: GraphQLNonNull(GraphQLString) },
            authorID: { type: GraphQLNonNull(GraphQLInt) },
            author: {
                type: AuthorType,
                resolve: (book) => {
                    return authors.find(author => author.name === book.author)
                }
            }
        }
    )
})

const RootMutationType = new GraphQLObjectType({
    name: 'Mutation',
    description: 'Root Mutation',
    fields: () => ({
      addBook: {
        type: BookType,
        description: 'Add a book',
        args: {
          name: { type: GraphQLNonNull(GraphQLString) },
          author: { type: GraphQLNonNull(GraphQLString) },
        },
        resolve: (parent, args) => {
          const newBook = {
            id: books.length + 1,
            name: args.name,
            author: args.author
          };
          books.push(newBook);
          return newBook;
        }
      }
    })
  });

const AuthorType = new GraphQLObjectType({
    name: 'Author',
    description: 'This represents an author of a book',
    fields: () => ({
        id: { type: GraphQLNonNull(GraphQLInt) },
        name: { type: GraphQLNonNull(GraphQLString) }
    })
});

const RootQueryType = new GraphQLObjectType({
    name: 'Query',
    description: 'Root Query',
    fields: () => (
        {
            book: {
                type: new GraphQLList(BookType),
                description: 'List of All Books',
                resolve: () => books
            }
        }
    )
})

const schema = new GraphQLSchema({
    query: RootQueryType,
    mutation: RootMutationType,
})
// Define your GraphQL schema and resolvers here

app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}));

app.listen(3000, () => console.log('Server running on port 3000'));
