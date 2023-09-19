import { DefaultApolloClient } from '@vue/apollo-composable'
import { ApolloClient, createHttpLink, InMemoryCache } from '@apollo/client/core'

const httpLink = createHttpLink({
uri: 'https://graphqlzero.almansi.me/api',
})
const cache = new InMemoryCache()
const apolloClient = new ApolloClient({
    link: httpLink,
    cache,
})

export default apolloClient;