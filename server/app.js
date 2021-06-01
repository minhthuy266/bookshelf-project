const express = require('express')
const {ApolloServer} = require('apollo-server-express')
const mongoose = require('mongoose')

// Load schema & resolvers

const typeDefs = require('./schema/schema')
const resolvers = require('./resolver/resolver')

// Load db methods

const mongoDataMethods = require('./data/db')

const connectDB = async () => {
  try {
    await mongoose.connect(
      'mongodb+srv://minth266:Nguyenminhthuy2606@books-project.jkhhd.mongodb.net/myFirstDatabase?retryWrites=true&w=majority',
      {
        useCreateIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
      }
    )

    console.log('MongoDB Connected')
  } catch (error) {
    console.log(error.message)
    process.exit(1)
  }
}

connectDB()

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: () => ({mongoDataMethods}),
})

const app = express()
server.applyMiddleware({app})
app.listen({port: 4000}, () =>
  console.log(`Server ready at http://localhost:4000${server.graphqlPath}`)
)
