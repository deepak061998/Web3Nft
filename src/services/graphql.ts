import { ApolloClient, InMemoryCache } from "@apollo/client";

const API_KEY = "adf102380fc8d3179007b9ffd56c7fef";
const GRAPGQL_URL_ENDPOINT = `https://gateway.thegraph.com/api/${API_KEY}/subgraphs/id/BEkzgsGPhih7VE6aVwUL4h7EZyXJjZYn16T9PE5XCmou`;

export const client = new ApolloClient({
  cache: new InMemoryCache(),
  uri: GRAPGQL_URL_ENDPOINT,
  connectToDevTools: true,
});

export default client;
