import * as dotenv from 'dotenv'
import axios from 'axios'
import { SearchResponse, Movie, TV, ResolverArguments } from './types'
import { ApolloServer } from 'apollo-server'
import { readFileSync } from 'fs'

dotenv.config()

const PORT = process.env.PORT || 4000
const api_key = process.env.TMDB_API_KEY
const API_URL = 'https://api.themoviedb.org/3'

let typeDefs = readFileSync(__dirname + '/schema.gql').toString('utf-8')

let resolvers = {
    Query: {
        search: async function (parent: any, args: ResolverArguments, context: any, info: any) {
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
        movie: async function (parent: any, args: ResolverArguments, context: any, info: any) {
            let x = await axios.get<Movie>(API_URL + '/movie/' + args.id, {
                params: {
                    api_key,
                    language: 'en-US'
                }
            })
            return x.data
        },
        tv: async function (parent: any, args: ResolverArguments, context: any, info: any) {
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

let apolloServer = new ApolloServer({ typeDefs, resolvers })

apolloServer.listen().then(x => console.log(x.url))
