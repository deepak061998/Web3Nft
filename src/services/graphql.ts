import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_KEY = process.env.REACT_APP_API_KEY;
const GRAPGQL_URL_ENDPOINT = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/BEkzgsGPhih7VE6aVwUL4h7EZyXJjZYn16T9PE5XCmou`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPGQL_URL_ENDPOINT,
  connectToDevTools: true,
});

export default client;
