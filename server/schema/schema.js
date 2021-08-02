const { GraphQLObjectType,
    GraphQLString,
    GraphQLSchema,
    GraphQLID,
    GraphQLInt,
    GraphQLList
} = require('graphql');
const { _find } = require('lodash');

const books = require("../data/books.json");
const authors = require("../data/authors.json");

const Book = new GraphQLObjectType({
    name: 'Book',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        genere: { type: GraphQLString },
        author: {
            type: Author,
            resolve(parent, args) {
                return authors.find(author => author.id === parent.author.id);
            }
        }
    })
});

const Author = new GraphQLObjectType({
    name: 'Author',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        age: { type: GraphQLInt },
        books: {
            type: new GraphQLList(Book),
            resolve(parent, args) {
                return books.filter(book => book.author.id == parent.id);
            }
        }
    })
});


const RootQuery = new GraphQLObjectType({
    name: 'RootQueryType',
    fields: {
        book: {
            type: Book,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code data from database
                return books.find(book => book.id === args.id)
            }
        },
        author: {
            type: Author,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                //code data from database
                return authors.find(author => author.id === args.id)
            }
        },
        books: {
            type: new GraphQLList(Book),
            resolve(parent, args) {
                //code data from database
                return books
            }
        },
        authors: {
            type: new GraphQLList(Book),
            resolve(parent, args) {
                //code data from database
                return authors
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery
});


