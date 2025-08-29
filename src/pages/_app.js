import React, { useEffect, useContext } from "react";
import { useRouter } from "next/router";
import { LoadingContext, LoadingProvider } from "../utils/LoadingContext";
import "../styles/globals.css";
import '@fortawesome/fontawesome-free/css/all.min.css';


import { Inter } from "next/font/google";
import Layout from "../components/layout";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
});

function useMinRouteLoader(minMs = 500) {
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

export default function App({ Component, pageProps }) {
  useMinRouteLoader(); // Activate route loader



  return (
    <LoadingProvider>
      <main className={inter.className}>
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </main>
    </LoadingProvider>
  );
}
