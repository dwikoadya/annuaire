const { GraphQLObjectType, GraphQLSchema } = require('graphql');
const mutation = require('./mutations/index');
const { queryType } = require('./queries/phone');

exports.phoneSchema = new GraphQLSchema({
   query: queryType,
   mutation: new GraphQLObjectType({
      name: 'Mutation',
      fields: mutation
   })
})