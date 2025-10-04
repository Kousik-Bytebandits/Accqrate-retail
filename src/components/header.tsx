"use client";
import React, { useState, useEffect, useRef } from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "./ui/accordion";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "./ui/navigation-menu";
import { IoChevronDown } from "react-icons/io5";

// ===================== Type Definitions =====================
interface SubItem {
  title: string;
  description: string;
  href: string;
  img?: string;
  icon?: string;
  stats?: string;
}

interface Section {
  heading: string;
  description?: string;
  images?: string;
  subItems: SubItem[];
}

interface Menu {
  id: string;
  title: string;
  type: "mega" | "simple" | "stories";
  sections: Section[];
}

interface Language {
  code: string;
  name: string;
  display: string;
}

interface Country {
  name: string;
  code: string;
  flag: string;
}

interface LangCountryDropdownProps {
  selectedLanguage: string;
  setSelectedLanguage: (language: string) => void;
  selectedCountry: string;
  setSelectedCountry: (country: string) => void;
  show: boolean;
  setShow: (show: boolean) => void;
  align?: "left" | "right";
}

interface ListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  className?: string;
  title: string;
  img?: string;
}

interface ResourcesListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  className?: string;
  title: string;
  icon?: string;
  img?: string;
}

interface SuccessStoriesListItemProps extends React.ComponentPropsWithoutRef<"a"> {
  className?: string;
  title: string;
  stats?: string;
}

// ===================== Data =====================
const menus = [
  {
    id: "products",
    title: "Products",
    type: "mega",
    sections: [
      {
        heading: "Business Solution",
        images: "/images/NavBar/line/pro1.svg",
        subItems: [
          {
            title: "Accqrate Books",
            description: "Manage customer relationships efficiently.",
            img: "/images/NavBar/fill/Books.svg",
            href: "/products/crm",
          },
          {
            title: "Accqrate CRM",
            description: "Manage customer relationships efficiently.",
            img: "/images/NavBar/fill/crm.svg",
            href: "/products/crm",
          },
          {
            title: "Accqrate Plan360",
            description: "Automate HR workflows and employee management.",
            img: "/images/NavBar/fill/plan.svg",
            href: "/products/hr",
          },
          {
            title: "Accqrate Service",
            description: "Manage customer relationships efficiently.",
            img: "/images/NavBar/fill/service.svg",
            href: "/products/crm",
          },
          {
            title: "Accqrate People",
            description: "Manage customer relationships efficiently.",
            img: "/images/NavBar/fill/people.svg",
            href: "/products/crm",
          },
          {
            title: "Accqrate Retail",
            description: "Automate HR workflows and employee management.",
            img: "/images/NavBar/fill/retail.svg",
            href: "/products/hr",
          },
          {
            title: "Accqrate Factory",
            description: "Manage customer relationships efficiently.",
            img: "/images/NavBar/fill/Factory.svg",
            href: "/products/crm",
          },
          {
            title: "Accqrate Filehub",
            description: "Automate HR workflows and employee management.",
            img: "/images/NavBar/fill/Filehub.svg",
            href: "/products/hr",
          },
        ],
      },
      {
        heading: "Enterprise Solution",
        images: "/images/NavBar/line/pro2.svg",
        subItems: [
          {
            title: "Accqrate ONE",
            description: "End-to-end ERP for large enterprises.",
            img: "/images/NavBar/fill/one.svg",
            href: "/products/erp",
          },
        ],
      },
      {
        heading: "E-Invoicing Solution",
        images: "/images/NavBar/line/pro3.svg",
        subItems: [
          {
            title: "Standalone E-invoicing Solution",
            description: "Sample content will be replaced",
            href: "/images/",
            img: "/images/NavBar/fill/standalone.svg",
          },
          {
            title: "E-invoicing Integration Solution",
            description: "Sample content will be replaced",
            href: "/images/NavBar/fill/e-invoice.svg",
            img: "/images/NavBar/fill/e-invoice.svg",
          },
        ],
      },
    ],
  },
  {
    id: "resources",
    title: "Resources",
    type: "simple",
    sections: [
      {
        heading: "Learn",
        description: "Expand your knowledge with our comprehensive resources",
        subItems: [
          {
            title: "About us",
            description: "Insights, tips and industry news",
            href: "/resources/blog",
            icon: "/images/NavBar/line/about.svg",
          },
          {
            title: "Blogs",
            description: "Live and recorded sessions from experts",
            href: "/resources/webinars",
            icon: "/images/NavBar/line/blog.svg",
          },
        ],
      },
      {
        heading: "Support",
        description: "Get help when you need it",
        subItems: [
          {
            title: "Announcements",
            description: "Find answers to common questions",
            href: "/resources/help",
            icon: "/images/NavBar/line/anounce.svg",
          },
          {
            title: "FAQs",
            description: "Connect with other users",
            href: "/resources/forum",
            icon: "/images/NavBar/line/faq.svg",
          },
        ],
      },
      {
        heading: "Engage",
        description: "Resources to get started quickly",
        subItems: [
          {
            title: "Webinars",
            description: "In-depth analysis and research",
            href: "/resources/whitepapers",
            icon: "/images/NavBar/line/webinars.svg",
          },
          {
            title: "VAT Calculator",
            description: "Real-world success stories",
            href: "/resources/case-studies",
            icon: "/images/NavBar/line/cal.svg",
          },
        ],
      },
    ],
  },
  {
    id: "successStories",
    title: "Success Stories",
    type: "stories",
    sections: [
      {
        heading: "Industry Solutions",
        description: "See how we've helped businesses across industries",
        subItems: [
          {
            title: "Retail & E-commerce",
            description: "Transforming retail operations",
            href: "/success-stories/retail",
            stats: "+45% efficiency",
          },
        ],
      },
    ],
  },
];

const languages: Language[] = [
  { code: "ar", name: "Arabic", display: "العربية" },
  { code: "ml", name: "Malayalam", display: "Malayalam" },
  { code: "en", name: "English", display: "English" },
];

const countries: Country[] = [
  { name: "Saudi Arabia", code: "SA", flag: "/images/flag-saudi-arabia.svg" },
  { name: "UAE", code: "AE", flag: "/images/flag-uae.svg" },
  { name: "Oman", code: "OM", flag: "/images/flag-oman.svg" },
];

// ===================== Components =====================

// Language & Country Dropdown
const LangCountryDropdown: React.FC<LangCountryDropdownProps> = ({
  selectedLanguage,
  setSelectedLanguage,
  selectedCountry,
  setSelectedCountry,
  show,
  setShow,
  align = "left",
}) => {
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [setShow]);

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        className="flex items-center justify-between gap-2 w-36 lg:w-44 px-3 py-2 rounded-md"
        onClick={() => setShow(!show)}
      >
        <img
          src={countries.find((c) => c.name === selectedCountry)?.flag}
          alt={selectedCountry}
          className="w-[30px] h-[30px]"
        />
        <span className="text-black truncate text-sm lg:text-base">
          {languages.find((l) => l.name === selectedLanguage)?.display} /{" "}
          {countries.find((c) => c.name === selectedCountry)?.code}
        </span>
        <i className="fa-solid fa-angle-down ml-1"></i>
      </button>

      {show && (
        <div
          className={`absolute ${align === "right" ? "right-0" : "left-0"
            } top-full mt-2 max-w-xs w-60 bg-white rounded-md shadow-lg z-50 p-4 text-sm text-gray-700`}
        >
          {/* Languages */}
          <div className="mb-2 font-semibold text-black">Select Language</div>
          <div className="flex flex-wrap gap-2 mb-4">
            {languages.map((lang) => (
              <button
                key={lang.code}
                className={`px-3 py-1 rounded-full transition ${selectedLanguage === lang.name
                  ? "bg-gray-100 text-black font-semibold"
                  : "text-black"
                  }`}
                onClick={() => {
                  setSelectedLanguage(lang.name);
                  setShow(false);
                }}
                style={{ border: "1px solid black", borderRadius: "20px" }}
              >
                {lang.display}
              </button>
            ))}
          </div>

          {/* Countries */}
          <div className="mb-2 font-semibold text-black">Select Country</div>
          <div className="space-y-2 max-h-40 overflow-y-auto">
            {countries.map((country) => (
              <div
                key={country.name}
                className="flex items-center cursor-pointer p-2 rounded-md hover:bg-gray-50"
                onClick={() => {
                  setSelectedCountry(country.name);
                  setShow(false);
                }}
              >
                <img
                  src={country.flag}
                  alt={country.name}
                  className="w-5 h-5 mr-2"
                />
                <span className="text-black">{country.name}</span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

// Arrow
const Arrow45: React.FC = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="w-3 h-3 transform -rotate-45"
    fill="none"
    viewBox="0 0 24 24"
    stroke="currentColor"
    strokeWidth={2}
  >
    <path strokeLinecap="round" strokeLinejoin="round" d="M5 12h14M12 5l7 7-7 7" />
  </svg>
);

// Custom Trigger without shadcn arrow
const CustomNavigationTrigger: React.FC<{
  id: string;
  title: string;
  activeMenu: string;
  setActiveMenu: (id: string) => void;
  setActiveSection: (section: string) => void;
}> = ({ id, title, activeMenu, setActiveMenu, setActiveSection }) => {
  return (
    <button
      className={`flex items-center gap-1 text-[0.875rem] ${activeMenu === id ? "text-[#534ED3]" : "text-gray-600"} hover:text-[#534ED3] focus:outline-none`}
      onClick={(e) => {
        e.preventDefault();
        setActiveMenu(activeMenu === id ? "" : id);
        if (id === "products") setActiveSection("Business Solution");
      }}
    >
      {title}
      {activeMenu === id && <i className="fa-solid fa-angle-up ml-1"></i>}
    </button>
  );
};

// ===================== Header =====================
const Header: React.FC = () => {
  const [activeMenu, setActiveMenu] = useState<string>("");
  const [activeSection, setActiveSection] = useState<string>("Business Solution");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [selectedLanguage, setSelectedLanguage] = useState<string>("Arabic");
  const [selectedCountry, setSelectedCountry] = useState<string>("Saudi Arabia");
  const [showLangCountryDropdown, setShowLangCountryDropdown] = useState<boolean>(false);
  const [headerHeight, setHeaderHeight] = useState<number>(0);

  const navRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const computeHeaderHeight = () => {
      const h = headerRef.current?.getBoundingClientRect().height || 0;
      setHeaderHeight(h);
    };
    computeHeaderHeight();
    window.addEventListener("resize", computeHeaderHeight);
    window.addEventListener("load", computeHeaderHeight);
    return () => {
      window.removeEventListener("resize", computeHeaderHeight);
      window.removeEventListener("load", computeHeaderHeight);
    };
  }, []);

  const activeMenuData = menus.find((menu) => menu.id === activeMenu);

  return (
    <header ref={headerRef} className="z-50 m-0 p-0 w-full bg-white lg:border">
      <div className="w-full px-6 pt-6 lg:pt-0 md:px-[32px]">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <div className="logo-container flex items-center justify-around gap-6">
            <Link href="/" className="shrink-0">
              <img
                src="/images/logo.svg"
                alt="Accqrate Logo"
                className="h-[1.625rem] w-auto cursor-pointer max-w-[115px] sm:max-w-[100px] md:max-w-[140px]"
              />
            </Link>

            {/* Desktop Nav */}
            <nav ref={navRef} className="hidden lg:flex items-center justify-around xl:gap-5 2xl:gap-10 text-[14px] text-gray-600 flex-1">
              <NavigationMenu className="w-full">
                <NavigationMenuList className="py-4">
                  {menus.map((menu) => (
                    <NavigationMenuItem key={menu.id}>
                      <NavigationMenuTrigger
                        hideChevron
                        className={`${activeMenu === menu.id ? "text-[#534ED3]" : "text-gray-600 hover:text-[#534ED3]"}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setActiveMenu(activeMenu === menu.id ? "" : menu.id);
                          if (menu.id === "products") setActiveSection("Business Solution");
                        }}
                      >
                        <span className="inline-flex items-center gap-1">
                          {menu.title}
                          <IoChevronDown
                            className={`transition-transform duration-200 ${activeMenu === menu.id ? "rotate-180" : "rotate-0"}`}
                            aria-hidden="true"
                          />
                        </span>
                      </NavigationMenuTrigger>

                      {activeMenu === menu.id && (
                        <NavigationMenuContent
                          className="!fixed left-0 right-0 top-0 !w-screen !max-w-none bg-white"
                          style={{ top: headerHeight }}
                        >
                          <div className="w-[900px] xl:w-[1044px] mx-auto px-8 py-10 shadow-lg rounded-xl flex flex-col">
                            {activeMenuData.type === "mega" ? (
                              <div className="grid grid-cols-3 gap-8 w-full max-w-7xl mx-auto">
                                {/* Categories */}
                                <div className="col-span-1 border-r pr-6 mb-2">
                                  <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-500">
                                    Products
                                  </h6>
                                  <ul className="mt-3 space-y-6">
                                    {activeMenuData.sections.map((section) => (
                                      <li
                                        key={section.heading}
                                        className={`cursor-pointer px-2 py-1 ${activeSection === section.heading ? "font-semibold" : "text-gray-700"}`}
                                        onMouseEnter={() => setActiveSection(section.heading)}
                                      >
                                        <div className="flex items-center gap-2">
                                          <img src={section.images || ""} alt={section.heading} className="w-4 h-4" />
                                          <span>{section.heading}</span>
                                        </div>
                                      </li>
                                    ))}
                                  </ul>
                                </div>

                                {/* Subitems */}
                                <div className="col-span-2 mb-2">
                                  <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-500 mb-3">
                                    {activeSection}
                                  </h6>
                                  <ul className="grid grid-cols-2 gap-3 mb-2">
                                    {activeMenuData.sections
                                      .find((sec) => sec.heading === activeSection)
                                      ?.subItems.map((item) => (
                                        <ListItem
                                          key={item.title}
                                          title={item.title}
                                          href={item.href}
                                          img={item.img}
                                        >
                                          {item.description}
                                        </ListItem>
                                      ))}
                                  </ul>
                                </div>
                              </div>
                            ) : activeMenuData.type === "simple" ? (
                              <div className="w-full max-w-7xl mx-auto mb-2">
                                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-500 mb-6">
                                  Resources
                                </h6>
                                <div className="grid grid-cols-3 gap-8">
                                  {activeMenuData.sections.map((section, index) => (
                                    <div key={index} className="border-r last:border-r-0 pr-6 last:pr-0">
                                      <h3 className="font-semibold text-lg mb-2">{section.heading}</h3>
                                      <ul className="space-y-4">
                                        {section.subItems.map((item, i) => (
                                          <ResourcesListItem key={i} title={item.title} href={item.href} img={item.icon}></ResourcesListItem>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            ) : (
                              <div className="w-full max-w-7xl mx-auto mb-4">
                                <h6 className="pl-2.5 font-semibold uppercase text-sm text-gray-500 mb-6">
                                  Success Stories
                                </h6>
                                <div className="grid grid-cols-3 gap-8">
                                  {activeMenuData.sections.map((section, index) => (
                                    <div key={index} className="border-r last:border-r-0 pr-6 last:pr-0">
                                      <h3 className="font-semibold text-lg mb-2">{section.heading}</h3>
                                      <p className="text-sm text-gray-500 mb-4">{section.description}</p>
                                      <ul className="space-y-4">
                                        {section.subItems.map((item, i) => (
                                          <SuccessStoriesListItem key={i} title={item.title} href={item.href} stats={item.stats}>
                                            {item.description}
                                          </SuccessStoriesListItem>
                                        ))}
                                      </ul>
                                    </div>
                                  ))}
                                </div>
                              </div>
                            )}

                            {/* CTA */}
                            <div className="mt-auto -mx-8 -mb-10 bg-[#F7F8FF] flex justify-end py-4 gap-4">
                              <Link href="/book-demo" className="inline-flex items-center justify-center gap-2 py-2 px-6 rounded-[80px] text-[14px] hover:text-black">
                                Book a Demo →
                              </Link>
                              <span role="separator" aria-orientation="vertical" className="self-center h-8 w-px bg-gray-300"></span>
                              <Link href="/contact-sales" className="inline-flex items-center gap-2 py-2 px-6 rounded-[80px] text-[14px] hover:text-black">
                                Contact Sales →
                              </Link>
                            </div>
                          </div>
                        </NavigationMenuContent>
                      )}
                    </NavigationMenuItem>
                  ))}
                </NavigationMenuList>
              </NavigationMenu>
            </nav>
          </div>

          {/* Right section */}
          <div className="hidden xl:flex items-center gap-2 shrink-0">
            <LangCountryDropdown
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              show={showLangCountryDropdown}
              setShow={setShowLangCountryDropdown}
              align="right"
            />
            <Link
              href="/request-demo"
              className="hidden xl:inline-flex items-center justify-center gap-2 text-[#F05A28] h-[41px] w-[155px] rounded-[80px] text-[14px] border border-[#F05A28]"
            >
              Contact Sales
            </Link>
            <Link
              href="/request-demo"
              className="hidden xl:inline-flex items-center justify-center gap-2 text-white h-[41px] w-[155px] rounded-[80px] text-[14px] bg-[#F05A28]"
            >
              Book a Demo
              <Arrow45 />
            </Link>
          </div>

          {/* Mobile / Tablet */}
          <div className="flex md:flex xl:hidden items-center gap-3">
            <LangCountryDropdown
              selectedLanguage={selectedLanguage}
              setSelectedLanguage={setSelectedLanguage}
              selectedCountry={selectedCountry}
              setSelectedCountry={setSelectedCountry}
              show={showLangCountryDropdown}
              setShow={setShowLangCountryDropdown}
              align="right"
            />
            <button
              className="block bg-transparent border-none text-gray-700 text-2xl cursor-pointer shrink-0"
              aria-label="Toggle mobile menu"
              onClick={() => setIsMobileMenuOpen((p) => !p)}
            >
              <i className={`fa-solid ${isMobileMenuOpen ? "fa-xmark" : "fa-bars"}`}></i>
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="xl:hidden fixed top-[70px] md:top-[80px] left-0 w-full h-screen overflow-y-auto bg-white px-6 md:px-[32px] py-4 z-[999]">
          <Accordion type="single" collapsible className="w-full">
            {menus.map(({ id, title, sections }) => (
              <AccordionItem key={id} value={id}>
                <AccordionTrigger className="text-gray-800 font-semibold hover:text-[#534ED3]">
                  {title}
                </AccordionTrigger>
                <AccordionContent>
                  <Accordion type="single" collapsible className="pl-4">
                    {sections.map((section, sectionIndex) => (
                      <AccordionItem key={sectionIndex} value={`${id}-${section.heading}`}>
                        <AccordionTrigger className="fflex items-center justify-start gap-2 text-gray-700 font-medium">
                          {section.images && <img src={section.images} alt={section.heading} className="w-4 h-4" />}
                          <span>{section.heading}</span>
                        </AccordionTrigger>
                        <AccordionContent>
                          <ul className="pl-4 mt-2 space-y-2">
                            {section.subItems.map((item, i) => (
                              <li
                                key={i}
                                className="flex items-center gap-2 text-[#737373] text-[14px] py-2 cursor-pointer border-b border-gray-200 hover:text-[#534ED3]"
                              >
                                {item.img && <img src={item.img} alt={item.title} className="w-5 h-5" />}
                                <Link href={item.href} className="flex-1">
                                  {item.title}
                                </Link>
                                <Arrow45 />
                              </li>
                            ))}
                          </ul>
                        </AccordionContent>
                      </AccordionItem>
                    ))}
                  </Accordion>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
          {/* CTA Buttons */}
          <div className="mt-10 flex gap-4">
            <Link
              href="/contact-sales"
              className="block w-full text-center text-[#F05A28] border border-[#F05A28] py-3 rounded-full text-sm font-bold"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Contact Sales
            </Link>
            <Link
              href="/book-demo"
              className="block w-full text-center text-white py-3 rounded-full text-sm font-bold bg-[#F05A28]"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Book a Demo
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};

const ListItem = React.forwardRef<HTMLAnchorElement, ListItemProps>(
  ({ className, title, children, img, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className="flex items-start space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
            {...props}
          >
            {img && (
              <img src={img} alt={title} className="w-[45px] h-[45px] mr-3" />
            )}
            <div>
              <div className="text-sm font-semibold leading-none">{title}</div>
              <p className="line-clamp-2 text-[12px] text-slate-500 leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

const ResourcesListItem = React.forwardRef<HTMLAnchorElement, ResourcesListItemProps>(
  ({ className, title, children, icon, img, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className="flex items-start space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50"
            {...props}
          >
            <div className="w-8 h-8 flex items-center justify-center rounded-full mr-3">
              {(() => {
                const source = img || icon;
                if (!source) return null;
                // Treat as image if it starts with './' or '/' or has a common image extension
                const isImagePath =
                  /^\.|^\//.test(source) ||
                  /\.(png|jpe?g|svg|webp|gif)$/i.test(source);
                if (isImagePath) {
                  const normalized = source.replace(/^\.\//, "/");
                  return (
                    <img
                      src={normalized}
                      alt={title}
                      className="w-6 h-6 object-contain"
                    />
                  );
                }
                // Otherwise treat as a font-awesome class name
                return (
                  <i
                    className={`fa-solid ${source} text-gray-600`}
                    aria-hidden="true"
                  ></i>
                );
              })()}
            </div>
            <div>
              <div className="text-sm font-medium leading-none">{title}</div>
              <p className="text-sm leading-snug text-muted-foreground">
                {children}
              </p>
            </div>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ResourcesListItem.displayName = "ResourcesListItem";

const SuccessStoriesListItem = React.forwardRef<HTMLAnchorElement, SuccessStoriesListItemProps>(
  ({ className, title, children, stats, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className="block rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-gray-50 focus:bg-gray-50 border border-gray-200"
            {...props}
          >
            <div className="text-sm font-medium leading-none mb-1">{title}</div>
            <p className="text-sm leading-snug text-muted-foreground mb-2">
              {children}
            </p>
            {stats && (
              <div className="text-xs font-semibold text-[#F05A28] bg-orange-50 px-2 py-1 rounded-full inline-block">
                {stats}
              </div>
            )}
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
SuccessStoriesListItem.displayName = "SuccessStoriesListItem";

export default Header;