import React, { useContext, useState, useEffect } from "react";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";

export default function Footer() {
  const { loading } = useContext(LoadingContext);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [openSections, setOpenSections] = useState({});

  // Handle screen size
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 1024);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Lazy load footer
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { rootMargin: "0px", threshold: 0.5 }
    );

    const element = document.getElementById("footerSection");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  const toggleSection = (title) => {
    setOpenSections((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  const sections = [
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

  const socialLinks = [
    { href: "https://www.facebook.com/people/Accqrate/100077291530631/", src: "/images/facebook.svg" },
    { href: "https://www.linkedin.com/showcase/accqrate", src: "/images/linkedin.svg" },
    { href: "https://twitter.com/accqrate_erp", src: "/images/twitter.svg" },
    { href: "https://www.instagram.com/accqrateerp/", src: "/images/instagram.svg" },
    { href: "https://www.youtube.com/channel/UCAzO34h3KxRrObyRor70D9A", src: "/images/youtube.svg" },
    { href: "https://www.reddit.com/user/Accqrate_ERP", src: "/images/reddit.svg" },
    { href: "https://www.snapchat.com/add/accqrate", src: "/images/snapchat.svg" },
    { href: "https://api.whatsapp.com/send/?phone=966541999357&type=phone_number&app_absent=0", src: "/images/whatsapp.svg" },
  ];

  // Skeleton loader
  if (loading || !isVisible) {
    return (
      <footer id="footerSection" className="bg-white mt-10">
        <div className="max-w-[1400px] mx-auto px-4 py-10 flex flex-wrap justify-between gap-6">
          {[...Array(6)].map((_, idx) => (
            <div key={idx}>
              <Skeleton height="24px" width="60%" className="mb-4" />
              {[...Array(6)].map((_, i) => (
                <Skeleton key={i} height="18px" width="80%" className="mb-2" />
              ))}
            </div>
          ))}
        </div>
        <div className="flex justify-center gap-4 mt-4">
          {[...Array(8)].map((_, i) => (
            <Skeleton key={i} height="20px" width="20px" />
          ))}
        </div>
        <div className="text-center text-gray-500 text-sm py-4">
          <Skeleton height="20px" width="40%" />
        </div>
      </footer>
    );
  }

  return (
    <footer id="footerSection" className="bg-white  mt-10">
      {/* Desktop footer */}
      {!isMobile && (
        <div className="max-w-full mx-auto px-4 md:px-10 py-10 flex justify-between gap-8 overflow-x-auto">
          {sections.map((section, idx) => (
            <div key={idx} className="flex flex-col min-w-[150px]">
              <h3 className="font-bold mb-4 text-sm lg:text-base">{section.title}</h3>
              {section.items.map((item, i) => (
                <p key={i} className="text-gray-600 text-sm mb-2 hover:text-black cursor-pointer">
                  {item}
                </p>
              ))}
            </div>
          ))}
        </div>
      )}

      {/* Social & copyright */}
      <div className="  pt-4 pb-6 text-center">
        <div className="flex flex-wrap justify-center gap-4 mb-4 ">
          {socialLinks.map(({ href, src }, idx) => (
            <a key={idx} href={href} target="_blank" rel="noopener noreferrer">
              <img src={src} alt="social icon" className="w-5 h-5 md:w-6 md:h-6 hover:scale-110 transition-transform" />
            </a>
          ))}
        </div>
        <div className="border-t border-[#0000003D] mb-4 md:w-[90%] w-[340px] mx-auto" />

        <p className="text-[#525252] text-fluid-small ">
          © Copyright 2021 - 2025{" "}
          <span className="text-[#194BED] font-medium">Accqrate</span>, All rights reserved.
        </p>
      </div>
    </footer>
  );
}
