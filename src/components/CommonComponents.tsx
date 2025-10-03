"use client";

import React, { useContext, ButtonHTMLAttributes, HTMLAttributes, VideoHTMLAttributes } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";
import Image, { ImageProps } from "next/image";

// Type for CustomButton props
interface CustomButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  width?: number | string;
  height?: number | string;
}

// Default export (main component)
export default function CustomButton({ children, width = 160, height = 44, ...props }: CustomButtonProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  }

  return <button {...props}>{children}</button>;
}

// Named export CustomImage
interface CustomImageProps extends Omit<ImageProps, "src"> {
  src: string;
  alt: string;
  width?: number | string;
  height?: number | string;
  className?: string;
}

export function CustomImage({ src, alt, width, height, className, ...props }: CustomImageProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return <Skeleton height={height || 200} width={width || "100%"} style={{ margin: "8px 0" }} />;
  }

  return <Image src={src} alt={alt} width={width} height={height} className={className} {...props} />;
}

// Named export CustomVideo
interface CustomVideoProps extends VideoHTMLAttributes<HTMLVideoElement> {
  width?: number | string;
  height?: number;
  className?: string;
}

export function CustomVideo({ width = "100%", height = 300, className, ...props }: CustomVideoProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return <Skeleton height={height} width={width} style={{ margin: "8px 0" }} />;
  }

  return <video {...props} className={className} />;
}

// Paragraph component
interface ParagraphProps {
  children: React.ReactNode;
  lines?: number;
}

export function Paragraph({ children, lines = 3 }: ParagraphProps) {
  const { loading } = useContext(LoadingContext);

  if (loading) {
    return (
      <div>
        {Array.from({ length: lines }).map((_, i) => (
          <Skeleton key={i} height={20} width={`${90 - i * 10}%`} style={{ marginBottom: "8px" }} />
        ))}
      </div>
    );
  }

  return <p>{children}</p>;
}
