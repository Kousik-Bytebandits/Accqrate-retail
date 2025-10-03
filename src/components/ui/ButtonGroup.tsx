"use client";

import React from "react";
import Link from "next/link";

interface Button {
  text: string;
  href?: string;
  variant?: "filled" | "outline";
  bgColor?: string;
  textColor?: string;
  borderColor?: string;
}

interface ButtonGroupProps {
  buttons?: Button[];
  className?: string;
}

const ButtonGroup: React.FC<ButtonGroupProps> = ({ buttons = [], className = "" }) => {
  return (
    <div
      className={`my-8 md:my-[40px] lg:mt-[60px] flex flex-col md:flex-row gap-[12px] md:text-lg ${className}`}
    >
      {buttons.map((btn, index) => (
        <Link
          key={index}
          href={btn.href || "#"}
          className={`
            px-16 py-4 rounded-full font-semibold text-center
            ${
              btn.variant === "filled"
                ? `${btn.bgColor || "bg-[#1976D2]"} ${btn.textColor || "text-white"}`
                : `border ${btn.borderColor || "border-[#1976D2]"} ${
                    btn.textColor || "text-[#c2185b]"
                  }`
            }
          `}
        >
          {btn.text}
        </Link>
      ))}
    </div>
  );
};

export default ButtonGroup;
