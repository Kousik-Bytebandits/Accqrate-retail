import React, { useContext } from "react";
import Skeleton from "../components/skeleton";
import { LoadingContext } from "../utils/LoadingContext";

export default function Dashboard() {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <section className="w-full flex items-center justify-center mt-4 box-border">
        <Skeleton height="220px" width="100%" className="mb-6 mx-auto" />
      </section>
    );
  }

  return (
    <section className="w-full flex items-center justify-center mt-4 box-border px-4 md:px-2 sm:px-1">
      <div className="relative w-full max-w-[1200px] overflow-visible">
        <video
          src="/videos/accqratedashboard.mp4"
          muted
          autoPlay
          loop
          playsInline
          controls={false}
          preload="auto"
          className="w-full h-auto block object-contain max-h-[60vh] sm:max-h-[60vh]"
        />
      </div>
    </section>
  );
}
