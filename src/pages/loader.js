import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function Loader({ Component, pageProps }) {
  const router = useRouter();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 300000); // 5 minutes
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const handleStart = () => setLoading(true);
    const handleComplete = () => setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  }, [router]);

  if (loading) {
    return (
      <div className="fixed inset-0 bg-white z-50 flex flex-col items-center justify-center gap-4">
        {/* Skeleton Example */}
        <div className="relative w-1/2 h-8 rounded-md bg-gray-300 overflow-hidden animate-pulse">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.25s_infinite]" />
        </div>
        <div className="relative w-4/5 h-4 rounded-md bg-gray-300 overflow-hidden animate-pulse">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.25s_infinite]" />
        </div>
        <div className="relative w-40 h-11 rounded-full bg-gray-300 overflow-hidden animate-pulse">
          <div className="absolute inset-0 transform -translate-x-full bg-gradient-to-r from-transparent via-white/60 to-transparent animate-[shimmer_1.25s_infinite]" />
        </div>
      </div>
    );
  }

  return <Component {...pageProps} />;
}
