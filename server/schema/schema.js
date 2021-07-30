const {GraphQLObjectType, GraphQLString, GraphQLSchema } = require('graphql');
const {_find} = require('lodash');
const books = require("../data/books.json");
const Book =  new GraphQLObjectType ({
     name: 'Book',
     fields: () => ({
         id: {type: GraphQLString},
         name: {type: GraphQLString},
         genre: {type: GraphQLString}
     })
});

const RootQuery  = new GraphQLObjectType({
    name: 'RootQueryType',
    fields : {
        book: {
            type: Book,
            args: {id: {type: GraphQLString}},
            resolve(parent, args) {
                //code data from database
               return books.find( book => book.id === args.id )
            }

        }
    }
});

module.exports = new GraphQLSchema ({
    query: RootQuery
});


