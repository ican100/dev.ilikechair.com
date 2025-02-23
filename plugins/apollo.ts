import { ApolloLink, from, HttpLink } from '@apollo/client'
import { loadDevMessages, loadErrorMessages } from '@apollo/client/dev'
import { setContext } from '@apollo/client/link/context'
import { onError } from '@apollo/client/link/error'
import { removeTypenameFromVariables } from '@apollo/client/link/remove-typename'
import { ApolloClient, InMemoryCache } from '@apollo/experimental-nextjs-app-support'
import createUploadLink from 'apollo-upload-client/createUploadLink.mjs'

import { useStore } from '@/store'

import { appid, isDev } from '@config/index'

if (isDev) {
  loadDevMessages()
  loadErrorMessages()
}

const BASE_URL = `${process.env.NEXT_PUBLIC_BASE_URL}/graphql`

const httpLink = new HttpLink({
  uri: BASE_URL
})

// https://www.apollographql.com/docs/react/networking/authentication
const authLink = setContext((_, { headers }) => {
  const token = useStore.getState().token

  return {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    headers: {
      ...headers,
      Authorization: token ? `Bearer ${token}` : '',
      Appid: appid
    }
  }
})

// eslint-disable-next-line @typescript-eslint/no-unsafe-call
const uploadLink = createUploadLink({
  uri: BASE_URL,
  headers: { 'Apollo-Require-Preflight': 'true' }
}) as ApolloLink

const removeTypenameLink = removeTypenameFromVariables()

const errorLink = onError(({ graphQLErrors, networkError }) => {
  if (graphQLErrors)
    graphQLErrors.forEach(({ message, locations, path }) =>
      // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
      console.log(`[GraphQL error]: Message: ${message}, Location: ${locations}, Path: ${path}`)
    )

  if (networkError) console.log(`[Network error]: ${networkError}`)
})

// have a function to create a client for you
// https://www.apollographql.com/docs/react/data/file-uploads 没有开箱即用的上传组件
export const makeClient = () => {
  return new ApolloClient({
    cache: new InMemoryCache({
      addTypename: false
    }),
    link: from([authLink, errorLink, httpLink, removeTypenameLink, uploadLink]),
    defaultOptions: {
      query: {
        context: {
          fetchOptions: {
            next: {
              revalidate: 60 * 60 * 3 // 3 hours
            }
          }
        }
      }
    }
  })
}
