import React, { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";

export default function CustomVideo({ width = "100%", height = 300, className, ...props }) {
  const { loading } = useContext(LoadingContext);
  if (loading) return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  return <video {...props} className={className} />;
}