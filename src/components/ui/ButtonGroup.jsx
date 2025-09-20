"use client";

import React from "react";
import Link from "next/link";

export default function ButtonGroup({ buttons = [], className = "" }) {
    return (
        <div
            className={`my-8 md:mt-12 flex flex-col md:flex-row gap-[12px] md:text-lg ${className}`}
        >
            {buttons.map((btn, index) => (
                <Link
                    key={index}
                    href={btn.href || "#"}
                    className={`
            px-16 py-4 rounded-full font-semibold text-center
            ${btn.variant === "filled"
                            ? `${btn.bgColor || "bg-[#1976D2]"} ${btn.textColor || "text-white"}`
                            : `border ${btn.borderColor || "border-[#1976D2]"} ${btn.textColor || "text-[#c2185b]"}`
                        }`}
                >
                    {btn.text}
                </Link>
            ))}
        </div>
    );
}
