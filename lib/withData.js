import withApollo from 'next-with-apollo'
import ApolloClient from 'apollo-boost'
import { endpoint } from '../config'
import { LOCAL_STATE_QUERY } from '../components/Snack'

function createClient ({ headers }) {
  return new ApolloClient({
    uri: process.env.NODE_ENV === 'development' ? endpoint : endpoint,
    request: operation => {
      operation.setContext({
        fetchOptions: {
          credentials: 'include'
        },
        headers
      })
    },
    // Local data
    clientState: {
      resolvers: {
        Mutation: {
          hideSnack (_, variables, { cache }) {
            const { snackMsg, snackVariant } = cache.readQuery({
              query: LOCAL_STATE_QUERY
            })
            const data = {
              data: {
                snackOpen: false,
                snackMsg,
                snackVariant
              }
            }
            cache.writeData(data)
            return data
          },
          showSnack (_, { msg, variant }, { cache }) {
            const data = {
              data: {
                snackOpen: true,
                snackMsg: msg,
                snackVariant: variant || 'success'
              }
            }
            cache.writeData(data)
            return data
          }
        }
      },
      defaults: {
        snackOpen: false,
        snackMsg: 'Hey!',
        snackVariant: 'success'
      }
    }
  })
}

export default withApollo(createClient)
