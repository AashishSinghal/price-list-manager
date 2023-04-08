// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppContextProvider } from "../lib/AppContext";
import { QueryClient, QueryClientProvider } from "react-query";
import { ClerkProvider } from "@clerk/nextjs";

// Create a client
const queryClient = new QueryClient();

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppContextProvider value={session}>
        <QueryClientProvider client={queryClient}>
          <ClerkProvider {...pageProps}>
            <Component {...pageProps} />
          </ClerkProvider>
        </QueryClientProvider>
      </AppContextProvider>
    </SessionProvider>
  );
};

export default MyApp;
