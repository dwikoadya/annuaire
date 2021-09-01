const { GraphQLNonNull, GraphQLID } = require('graphql');
const phoneType = require('../types/phone').phoneType;
const services = require('../../services');

exports.remove = {
   type: phoneType,
   args: {
      id: {
         type: new GraphQLNonNull(GraphQLID)
      }
   },
   resolve(root, params) {
      return services.deleteContact(params);
   }
}