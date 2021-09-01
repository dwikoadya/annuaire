// const { GraphQLObjectType, GraphQLList } = require('graphql');

const { GraphQLObjectType, GraphQLList, GraphQLString, graphqlSync } = require("graphql");

var services = require("../../services");
var phoneType = require("../types/phone").phoneType;

const PaginationArgType = require("../types/paginationParam");
const PaginatedListType = require("../types/paginationOutput");

// //queryType without Pagination
// exports.queryType = new GraphQLObjectType({
//    name: 'Query',
//    fields: function () {
//      return {
//        phones: {
//          type: new GraphQLList(phoneType),
//          resolve: services.getContacts
//        }
//      }
//    }
//  });

// queryType by Pagination
exports.queryType = new GraphQLObjectType({
  name: "Query",
  fields: function () {
    return {
      phones: {
        type: PaginatedListType(phoneType),
        args: {
          name: { type: GraphQLString },
          phone: { type: GraphQLString },
          pagination: {
            type: PaginationArgType,
            defaultValue: { offset: 0, limit: 5 },
          },
        },
        resolve(root, params) {
          let { offset, limit } = params.pagination;
          const { name, phone } = params;
          if (!name && !phone) {
            return {
              count: services.getPages(),
              items: services.getContacts(offset, limit),
            };
          }
          return {
            count: services.searchContactsPages(name, phone),
            items: services.searchContacts(name, phone, offset, limit),
          };
        },
      },
    };
  },
});
