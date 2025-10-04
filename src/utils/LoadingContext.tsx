"use client";

import React, { useEffect, useState, useMemo, createContext, useContext } from "react";

export type LoadingContextType = {
  loading: boolean;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
};

export const LoadingContext = createContext<LoadingContextType>({
  loading: false,
  setLoading: () => undefined,
});

type LoadingProviderProps = {
  children: React.ReactNode;
  initial?: boolean; // initial loading state
  delayMs?: number;  // auto-finish delay for skeletons
};

export function LoadingProvider({ children, initial = true, delayMs = 800 }: LoadingProviderProps) {
  const [loading, setLoading] = useState<boolean>(initial);

  useEffect(() => {
    if (!initial) return;
    const timer = setTimeout(() => setLoading(false), delayMs);
    return () => clearTimeout(timer);
  }, [initial, delayMs]);

  const value = useMemo(() => ({ loading, setLoading }), [loading]);

  return (
    <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>
  );
}

// Convenience hook for consumers
export function useLoading(): LoadingContextType {
  return useContext(LoadingContext);
}
