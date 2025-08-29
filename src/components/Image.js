import React, { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";
import Image from "next/image";

export default function CustomImage({ src, alt, width, height, className }) {
  const { loading } = useContext(LoadingContext);
  if (loading) return <Skeleton height={height || "200px"} width={width || "100%"} style={{ margin: "8px 0" }} />;
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
}
