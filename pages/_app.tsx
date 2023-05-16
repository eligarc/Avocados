import type { AppProps } from "next/app";
// import { QueryClientProvider, QueryClient } from "react-query";
// import { ReactQueryDevtools } from "react-query/devtools";
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import Layout from "../components/Layout/Layout";
import "../global.sass";

export function reportWebVitals(metric) {
  console.log(metric);
}

// const client = new QueryClient();
// Esto va generalmente en la carpeta llamada api o services
const baseUrl = process.env.NEXT_PUBLIC_SERVICES_URL || 'http://localhost:3000';
const client = new ApolloClient({
  uri: `${baseUrl}/graphql`,
  cache: new InMemoryCache({
    typePolicies: {
      Query: {
        fields: {
          avo: {
            read(_, { args, toReference }) {
              return toReference({
                __typename: 'Avocado',
                id: args?.id,
              })
            },
          },
        },
      },
    },
  }),
})

export default function MyApp({ Component, pageProps }: AppProps) {
  // Providers - Context/providers, Customs Themes, data
  // layout
  // props
  return (
    <ApolloProvider client={client}>
      <Layout>
        <Component {...pageProps} title={"Hola"} />
      </Layout>
      {/* <ReactQueryDevtools initialIsOpen={false} /> */}
    </ApolloProvider>
  );
}
