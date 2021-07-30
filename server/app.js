
const express = require('express');
const app = express();
const {graphqlHTTP} = require('express-graphql');
const schema = require('../server/schema/schema');



app.use('/graphql', graphqlHTTP({
    schema: schema,
    graphiql: true
}))

app.listen(4000, () => {
    console.log('QraphQl listioning to the port 4000')
})

