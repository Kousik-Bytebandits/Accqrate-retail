import React, { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";

export default function Paragraph({ children, lines = 3 }) {
  const { loading } = useContext(LoadingContext);
  if (loading) {
    return (
      <div>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} height="20px" width={`${90 - i * 10}%`} style={{ marginBottom: "8px" }} />
        ))}
      </div>
    );
  }
  return <p>{children}</p>;
}
