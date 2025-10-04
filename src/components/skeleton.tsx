import React from "react";

type SkeletonProps = {
  height?: string;
  width?: string;
  borderRadius?: string;
  className?: string;
};

const Skeleton: React.FC<SkeletonProps> = ({
  height = "20px",
  width = "100%",
  borderRadius = "",
  className = "",
}) => {
  const roundedClass = borderRadius
    ? borderRadius
    : height === "44px"
    ? "rounded-full"
    : height === "48px"
    ? "rounded-md"
    : ["200px", "300px", "350px"].includes(height)
    ? "rounded-lg"
    : "rounded";

  return (
    <div
      className={`
        mx-auto mb-3
        bg-gradient-to-r from-gray-300 via-gray-200 to-gray-300
        bg-400
        animate-skeleton-loading
        ${roundedClass}
        ${className}
      `}
      style={{ height, width }}
    />
  );
};

export default Skeleton;
