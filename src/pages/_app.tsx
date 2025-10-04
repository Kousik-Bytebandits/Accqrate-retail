// _app.tsx
"use client";

import React, { useEffect, useContext } from "react";
import type { AppProps } from "next/app";
import { useRouter } from "next/router";
import "../styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';
import { Inter } from "next/font/google";
import Layout from "../components/layout";
import { LoadingProvider, LoadingContext } from "../utils/LoadingContext";

// FONT CONFIG
const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

// use shared LoadingContext/Provider from ../utils/LoadingContext

// CUSTOM HOOK FOR MINIMUM ROUTE LOADER
function useMinRouteLoader(minMs: number = 500) {
  const router = useRouter();
  const { setLoading } = useContext(LoadingContext);

  useEffect(() => {
    let startTime = 0;

    const handleStart = () => {
      startTime = Date.now();
      setLoading(true);
    };

    const handleComplete = () => {
      const elapsed = Date.now() - startTime;
      const remaining = minMs - elapsed;
      setTimeout(() => setLoading(false), remaining > 0 ? remaining : 0);
    };

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router, minMs, setLoading]);
}

// APP COMPONENT
export default function App({ Component, pageProps }: AppProps) {
  useMinRouteLoader(); // ACTIVATE ROUTE LOADER

  return (
    <LoadingProvider>
      <main className={inter.className}>
        <div id="smooth-wrapper">
          <div id="smooth-content">
            <Layout>
              <Component {...pageProps} />
            </Layout>
          </div>
        </div>
      </main>
    </LoadingProvider>
  );
}
