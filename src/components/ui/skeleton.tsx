import React from "react";
import { cn } from "../../lib/utils";

interface SkeletonProps extends React.HTMLAttributes<HTMLDivElement> {
  height?: number | string;
  width?: number | string;
}

function Skeleton({ className, height, width, style, ...props }: SkeletonProps) {
  const mergedStyle = {
    ...(style || {}),
    ...(height !== undefined ? { height } : {}),
    ...(width !== undefined ? { width } : {}),
  } as React.CSSProperties;

  return (
    <div
      className={cn("animate-pulse rounded-md bg-gray-200", className)}
      style={mergedStyle}
      {...props}
    />
  );
}

export default Skeleton;
export { Skeleton };
