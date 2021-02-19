import express from 'express';
import { ApolloServer, gql } from 'apollo-server-express';

const app = express();

const books = [
  {
    title: "Harry Potter and the Sorcerer's stone",
    author: 'J.K. Rowling',
    pages: 100,
  },
  {
    title: 'Jurassic Park',
    author: 'Michael Crichton',
    pages: 201,
  },
];

const typeDefs = gql`
  type Query {
    books: [Book]
  }
  type Book {
    title: String
    author: String
    pages: Int
  }
`;

const resolvers = {
  Query: { books: () => books },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

server.applyMiddleware({ app });

app.listen({ port: 4000 }, () => {
  // eslint-disable-next-line no-console
  console.log(`server started at http://localhost:4000${server.graphqlPath}`);
});
