import React, { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";

export default function CustomButton({ children, width = 160, height = 44, ...props }) {
  const { loading } = useContext(LoadingContext);
  if (loading) return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  return <button {...props}>{children}</button>;
}
