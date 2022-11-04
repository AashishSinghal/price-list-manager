// src/pages/_app.tsx
import "../styles/globals.css";
import type { AppType } from "next/app";
import type { Session } from "next-auth";
import { SessionProvider } from "next-auth/react";
import { AppContextProvider } from "../lib/AppContext";

const MyApp: AppType<{ session: Session | null }> = ({
  Component,
  pageProps: { session, ...pageProps },
}) => {
  return (
    <SessionProvider session={session}>
      <AppContextProvider>
        <Component {...pageProps} />
      </AppContextProvider>
    </SessionProvider>
  );
};

export default MyApp;
