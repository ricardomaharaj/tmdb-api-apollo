import * as dotenv from 'dotenv'
import axios from 'axios'
import { SearchResponse, Movie, TV, SearchArgs, MediaArgs } from './types'
import { readFileSync } from 'fs'
import { ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginDrainHttpServer } from 'apollo-server-core'
import express from 'express'
import http from 'http'

dotenv.config()

const PORT = process.env.PORT || 4000
if (!process.env.TMDB_API_KEY) {
    throw new Error('TMDB_API_KEY not provided!')
}
const api_key = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

let typeDefs = readFileSync(__dirname + '/../src/schema.gql').toString('utf-8')

let resolvers = {
    Query: {
        search: async function (parent: any, args: SearchArgs, context: any, info: any) {
            let x = await axios.get<SearchResponse>(API_URL + '/search/multi', {
                params: {
                    api_key,
                    query: args.query,
                    page: 1,
                    language: 'en-US'
                }
            })
            return x.data.results
        },
        movie: async function (parent: any, args: MediaArgs, context: any, info: any) {
            let x = await axios.get<Movie>(API_URL + '/movie/' + args.id, {
                params: {
                    api_key,
                    language: 'en-US'
                }
            })
            return x.data
        },
        tv: async function (parent: any, args: MediaArgs, context: any, info: any) {
            let x = await axios.get<TV>(API_URL + '/tv/' + args.id, {
                params: {
                    api_key,
                    language: 'en-US'
                }
            })
            return x.data
        }
    }
}

async function startApolloServer(typeDefs: any, resolvers: any) {
    const app = express()
    const httpServer = http.createServer(app)
    const server = new ApolloServer({
        typeDefs,
        resolvers,
        csrfPrevention: false,
        cache: 'bounded',
        plugins: [ApolloServerPluginDrainHttpServer({ httpServer })],
    })
    await server.start()
    server.applyMiddleware({ app })
    await new Promise<void>(resolve => httpServer.listen({ port: PORT }, resolve))
    console.log(`http://localhost:${PORT}${server.graphqlPath}`)
}

startApolloServer(typeDefs, resolvers)
