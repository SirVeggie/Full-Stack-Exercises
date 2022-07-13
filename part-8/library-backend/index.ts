import { ApolloServer } from 'apollo-server';
import { config } from './src/config';
import mongoose from 'mongoose';
import typeDefs from './src/graphql/typedefs';
import resolvers from './src/graphql/resolvers';
import context from './src/graphql/context';

console.log(`connecting to ${config.mongoUrl}`);

mongoose.connect(config.mongoUrl)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.log(`Error connecting to MongoDB: ${err}`));

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context
});

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`);
});
