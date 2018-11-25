const express = require('express');
const graphqlHTTP = require('express-graphql');
const schema = require('./schema/schema');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

// allow cors
app.use(cors());

mongoose.connect('mongodb://cheez:cheezgqlemma2v39@ds125318.mlab.com:25318/gql-emma',{ useNewUrlParser: true });
mongoose.connection.once('open', () => {
	console.log('connected to gql db')
})

app.use('/graphql', graphqlHTTP({
	schema,
	graphiql: true
}));

app.listen(4000, () => {
	console.log('Up and running!')
});