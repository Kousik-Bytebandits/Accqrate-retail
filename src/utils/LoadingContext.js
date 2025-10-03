
import { useEffect, useState, useMemo, createContext } from "react";

export const LoadingContext = createContext({ loading: false, setLoading: () => {} });

export function LoadingProvider({ children }) {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);
  const value = useMemo(() => ({ loading, setLoading }), [loading]);
  return <LoadingContext.Provider value={value}>{children}</LoadingContext.Provider>;
}
