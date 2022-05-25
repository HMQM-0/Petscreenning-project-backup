import { ApolloClient, createHttpLink, InMemoryCache } from "@apollo/client";
import { setContext } from "@apollo/client/link/context";

// TODO: Use links to attach Auth token
const httpLink = createHttpLink({
  uri: process.env.NEXT_PUBLIC_API_URI,
});

const authLink = setContext((_, { headers }) => {
  // get the authentication token from local storage if it exists

  // return the headers to the context so httpLink can read them
  return {
    headers: {
      ...headers,
      origin: process.env.NEXT_PUBLIC_APOLLO_LINK_ORIGIN, // TODO: We need to sync with BE work to switch to a custom header
      // authorization: token ? `Bearer ${token}` : "",
    },
  };
});

const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

export default client;
