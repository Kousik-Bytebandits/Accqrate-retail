import React, { useContext } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";
import Image from "next/image"; // assuming you're using Next.js


//Default export (main component)
export default function CustomButton({ children, width = 160, height = 44, ...props }) {
  const { loading } = useContext(LoadingContext);
  if (loading) {
    return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  }
  return <button {...props}>{children}</button>;
}

// Named export CustomImage
export function CustomImage({ src, alt, width, height, className }) {
  const { loading } = useContext(LoadingContext);
  if (loading) return <Skeleton height={height || "200px"} width={width || "100%"} style={{ margin: "8px 0" }} />;
  return <Image src={src} alt={alt} width={width} height={height} className={className} />;
}

// named export CustomVideo
export function CustomVideo({ width = "100%", height = 300, className, ...props }) {
  const { loading } = useContext(LoadingContext);
  if (loading) return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  return <video {...props} className={className}  />;
}

export function Paragraph({ children, lines = 3 }) {
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