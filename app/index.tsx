import { Redirect } from "expo-router";
import "./globals.css";
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'

const clientQuery = new QueryClient();

export default function Index() {
  return (
    <QueryClientProvider client={clientQuery}>
      <Redirect href="/(auth)/register/" />;
    </QueryClientProvider>
  )
}
