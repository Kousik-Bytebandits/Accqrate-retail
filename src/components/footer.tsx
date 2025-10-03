"use client";

import React, { useContext, useState, useEffect, JSX } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "./skeleton";

interface Section {
  title: string;
  items: string[];
}

interface SocialLink {
  href: string;
  src: string;
}

export default function Footer(): JSX.Element {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState<boolean>(false);
  const [showSections, setShowSections] = useState<boolean>(true);

  useEffect(() => {
    const handleResize = () => {
      setShowSections(window.innerWidth >= 1024); // show only on desktop
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.5 }
    );

    const element = document.getElementById("footerSection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const sections: Section[] = [
    {
      title: "Accqrate-erp.com",
      items: [
        "Home",
        "Success Stories",
        "E-Invoicing solution",
        "Business solution",
        "ERP solution",
        "Testimonials",
      ],
    },
    {
      title: "About",
      items: [
        "Company",
        "Demo Videos",
        "Careers",
        "Blogs",
        "Announcements",
        "Webinars",
        "Partner with Us",
        "FAQs",
      ],
    },
    {
      title: "Featured Modules",
      items: [
        "E-Invoicing Software",
        "E-Invoicing Middleware",
        "Accounting Solutions",
        "Sales Management",
        "Purchase Management",
        "Inventory Management",
        "Fixed Asset Management",
      ],
    },
    {
      title: "More Modules",
      items: [
        "Production Management",
        "Document Management",
        "HR & Payroll",
        "Services",
        "POS",
        "CRM",
      ],
    },
    {
      title: "Data & Safety Management",
      items: [
        "Data Security",
        "Disaster Recovery",
        "Enhancements and Upgrades",
        "Application Support and Maintenance",
        "Terms and Conditions",
        "Privacy Policy",
        "Contact Support",
      ],
    },
    {
      title: "Integrations",
      items: ["SAP suits", "Oracle suits", "Microsoft suits", "VAT Calculator"],
    },
  ];

  const socialLinks: SocialLink[] = [
    {
      href: "https://www.facebook.com/people/Accqrate/100077291530631/",
      src: "/images/facebook.svg",
    },
    {
      href: "https://www.linkedin.com/showcase/accqrate",
      src: "/images/linkedin.svg",
    },
    { href: "https://twitter.com/accqrate_erp", src: "/images/twitter.svg" },
    {
      href: "https://www.instagram.com/accqrateerp/",
      src: "/images/instagram.svg",
    },
    {
      href: "https://www.youtube.com/channel/UCAzO34h3KxRrObyRor70D9A",
      src: "/images/youtube.svg",
    },
    {
      href: "https://www.reddit.com/user/Accqrate_ERP",
      src: "/images/reddit.svg",
    },
    {
      href: "https://www.snapchat.com/add/accqrate",
      src: "/images/snapchat.svg",
    },
    {
      href: "https://api.whatsapp.com/send/?phone=966541999357&type=phone_number&app_absent=0",
      src: "/images/whatsapp.svg",
    },
  ];

  if (loading || !isVisible) {
    return (
      <footer
        id="footerSection"
        className="bg-white border-t border-gray-200 font-inter min-h-full mt-[5%] text-[#333333]"
      >
        <div className="flex justify-between flex-nowrap max-w-[1280px] mx-auto px-4 py-10 text-black gap-8 overflow-x-auto">
          {[...Array(6)].map((_, idx) => (
            <div key={idx}>
              <Skeleton height="24px" width="60%" className="mb-4" />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height="18px" width="80%" className="mb-2" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex flex-wrap justify-center gap-3 mt-5 mx-auto">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} height="20px" width="20px" className="ml-2" />
          ))}
        </div>
        <Skeleton
          height="20px"
          width="40%"
          className="mx-auto mt-6 text-center"
        />
      </footer>
    );
  }

  return (
    <footer
      id="footerSection"
      className="bg-white border-gray-200 font-inter min-h-full px-6 md:px-[32px]"
    >
      {showSections && (
        <div className="flex justify-between flex-nowrap max-w-[1280px] mx-auto px-4 py-10 text-[#333333] gap-8 overflow-x-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col">
              <h3 className="font-bold mb-4 text-[16px] leading-6 whitespace-normal break-words">
                {section.title}
              </h3>
              {section.items.map((item, i) => (
                <p
                  key={i}
                  className="mb-4 text-sm leading-5 text-gray-600 whitespace-normal break-words"
                >
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      <div>
        <div className="flex flex-wrap justify-center gap-6 my-4 mt-5 mx-auto">
          {socialLinks.map(({ href, src }, idx) => (
            <a
              key={idx}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              className="transition-transform duration-300 hover:scale-110"
            >
              <img
                src={src}
                alt="social icon"
                className="w-[20px] h-[20px] sm:w-5 sm:h-5"
              />
            </a>
          ))}
        </div>

        <div className="border-t border-black/25 w-full mx-auto py-6 text-center text-xs text-gray-600">
          © Copyright 2021 - 2025{" "}
          <span className="text-[#194BED] text-sm leading-6 font-medium">
            Accqrate
          </span>
          , All rights reserved.
        </div>
      </div>
    </footer>
  );
}
