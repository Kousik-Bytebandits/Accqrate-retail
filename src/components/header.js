"use client";
import { useState, useEffect, useRef } from "react";
import Link from "next/link";

// ✅ Menus
const menus = [
  {
    id: "accqrate",
    title: "Accqrate-erp.com",
    href: "#",
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
    id: "about",
    title: "About",
    href: "#",
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
    id: "featured",
    title: "Featured Modules",
    href: "#",
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
    id: "more",
    title: "More Modules",
    href: "#",
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
    id: "safety",
    title: "Data & Safety Management",
    href: "#",
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
    id: "integrations",
    title: "Integrations",
    href: "#",
    items: ["SAP suits", "Oracle suits", "Microsoft suits", "VAT Calculator"],
  },
];

// ✅ Languages & Countries
const languages = [
  { code: "ar", name: "Arabic", display: "عربي" },
  { code: "ml", name: "Malay", display: "Malay" },
  { code: "en", name: "English", display: "English" },
];
const countries = [
  { name: "Saudi Arabia", code: "SA", flag: "/images/flag-saudi-arabia.svg" },
  { name: "UAE", code: "AE", flag: "/images/flag-uae.svg" },
  { name: "Oman", code: "OM", flag: "/images/flag-oman.svg" },
  { name: "Bahrain", code: "BH", flag: "/images/flag-bahrain.svg" },
  { name: "Malaysia", code: "MY", flag: "/images/flag-malaysia.svg" },
  { name: "Mauritius", code: "MU", flag: "/images/flag-mauritius.svg" },
  { name: "Jordan", code: "JO", flag: "/images/flag-jordan.svg" },
];


const LangCountryDropdown = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedCountry,
  setSelectedCountry,
  show,
  setShow,
}) => {
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  return (
    <div className="relative" ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        className="flex items-center gap-2 px-3 py-2 rounded-md"
        onClick={() => setShow((prev) => !prev)}
      >
        <img
          src={countries.find((c) => c.name === selectedCountry)?.flag}
          alt={selectedCountry}
          className="w-5 h-5"
        />
        <span className="truncate text-sm lg:text-base">
          {languages.find((l) => l.name === selectedLanguage)?.display} /{" "}
          {countries.find((c) => c.name === selectedCountry)?.code}
        </span>
        <i
          className={`fa-solid ml-1 transition-transform ${
            show ? "fa-angle-up" : "fa-angle-down"
          }`}
        ></i>
      </button>

      {/* Dropdown */}
      {show && (
        <div
          className={`
            fixed left-0 right-0 top-[64px] bottom-0 z-50 bg-white p-6 overflow-y-auto
            md:absolute md:inset-auto md:top-full md:mt-4 md:w-[300px] md:rounded-md md:shadow-lg md:p-4 md:bottom-auto md:left-auto
          `}
        >

          <div className="mb-2 font-semibold">Select Language</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                onClick={() => {
                  setSelectedLanguage(lang.name);
                  setShow(false);
                }}
                className={`px-3 py-1 rounded-full border ${
                  selectedLanguage === lang.name
                    ? "bg-gray-100 font-semibold"
                    : ""
                }`}
              >
                {lang.display}
              </button>
            ))}
          </div>

          <hr className="my-4" />

          <div className="mb-2 font-semibold">Select Country</div>
          <div className="space-y-2 max-h-[60vh] overflow-y-auto md:max-h-40">
            {countries.map((country) => (
              <div
                key={country.code}
                onClick={() => {
                  setSelectedCountry(country.name);
                  setShow(false);
                }}
                className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50"
              >
                <img src={country.flag} className="w-5 h-5 mr-2" />
                <span>{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};


// ✅ Unified Header
const Header = () => {
  const [activeDropdown, setActiveDropdown] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [expandedSections, setExpandedSections] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState("Arabic");
  const [selectedCountry, setSelectedCountry] = useState("Saudi Arabia");
  const [showLangCountryDropdown, setShowLangCountryDropdown] = useState(false);

  const navRef = useRef(null);
  const dropdownTimeoutRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (navRef.current && !navRef.current.contains(event.target)) {
        setActiveDropdown(null);
        setShowLangCountryDropdown(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleMouseEnter = (id) => {
    if (dropdownTimeoutRef.current) clearTimeout(dropdownTimeoutRef.current);
    setActiveDropdown(id);
  };

  const handleMouseLeave = () => {
    dropdownTimeoutRef.current = setTimeout(() => {
      setActiveDropdown(null);
    }, 150);
  };

  const toggleSection = (id) => {
    setExpandedSections((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <header className="z-50 bg-[#F2F2F2] w-full">
      <div className="w-full mx-auto flex justify-between items-center py-4  md:px-6">
        {/* Logo */}
        <Link href="/">
          <img
            src="/images/logo.svg"
            alt="Accqrate Logo"
            className="md:h-9 h-[28px] px-4 w-auto cursor-pointer"
          />
        </Link>

        {/* Centered Desktop Nav */}
        <nav
          ref={navRef}
          className="hidden xl:flex ml-6 space-x-4 2xl:space-x-8 text-[13px] font-light flex-1 justify-start"
        >
          {menus.map(({ title, href, id, items }) => (
            <div
              key={id}
              className="relative"
              onMouseEnter={() => handleMouseEnter(id)}
              onMouseLeave={handleMouseLeave}
            >
              <Link
                href={href}
                className={`pb-1 border-b-2 ${
                  activeDropdown === id
                    ? "border-pink-600 text-black"
                    : "border-transparent hover:border-pink-600 hover:text-pink-600"
                }`}
              >
                {title}
              </Link>
              {activeDropdown === id && (
                <ul className="absolute left-0 top-full mt-2 w-64 bg-white border rounded-md shadow-lg z-50">
                  {items.map((item, idx) => (
                    <li
                      key={idx}
                      className="px-4 py-2 cursor-pointer whitespace-nowrap hover:bg-gray-50"
                    >
                      {item}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          ))}
        </nav>

        {/* Right Section */}
        <div className="flex items-center  md:gap-3">
          {/* Desktop Dropdown */}
          <div className="">
            <LangCountryDropdown
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              show={showLangCountryDropdown}
              setShow={setShowLangCountryDropdown}
            />
          </div>

          <Link
            href="/request-demo"
            className="hidden xl:block text-white px-4 py-2 rounded text-sm font-bold bg-pink-600 hover:bg-pink-700"
          >
            REQUEST DEMO
          </Link>

          {/* Mobile Hamburger until xl */}
          <button
            className="xl:hidden text-2xl pr-2 text-gray-700"
            aria-label="Toggle mobile menu"
            onClick={() => setIsMobileMenuOpen((p) => !p)}
          >
            <i
              className={`fa-solid ${
                isMobileMenuOpen ? "fa-xmark" : "fa-bars"
              }`}
            ></i>
          </button>
        </div>
      </div>

  



      {/* Mobile Nav */}
      {isMobileMenuOpen && (
  <div
    className="
      xl:hidden 
      fixed inset-0 top-[64px]  /* adjust this = height of your navbar */
      bg-white z-50 
      px-4 py-6 overflow-y-auto
    "
  >
    {menus.map(({ id, title, items }) => (
      <div key={id} className="mb-6 border-b border-[#00000033]">
        <button
          className="w-full flex justify-between items-center font-semibold text-[18px] py-2"
          onClick={() => toggleSection(id)}
        >
          {title}
          <i
            className={`fa-solid transition-transform ${
              expandedSections[id] ? "fa-chevron-up" : "fa-chevron-down"
            }`}
          ></i>
        </button>
        {expandedSections[id] && (
          <ul className="pl-4 mt-2 space-y-2 pb-4">
            {items.map((item, i) => (
              <li
                key={i}
                className="text-[#525252] text-[16px]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                {item}
              </li>
            ))}
          </ul>
        )}
      </div>
    ))}

    <Link
      href="/request-demo"
      className="block text-left font-bold text-[#C2185B] text-[23px] py-2 pl-1"
    >
      REQUEST DEMO
    </Link>
  </div>
)}

    </header>
  );
};

export default Header;
