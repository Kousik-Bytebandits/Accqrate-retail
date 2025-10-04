"use client";

import * as React from "react";
import * as AccordionPrimitive from "@radix-ui/react-accordion";
import { ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

import { cn } from "../../lib/utils";

const Accordion = AccordionPrimitive.Root;

type AccordionItemProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Item> & {
  className?: string;
};

const AccordionItem = React.forwardRef<HTMLDivElement, AccordionItemProps>(
  ({ className, ...props }, ref) => (
    <AccordionPrimitive.Item ref={ref} className={cn("border-b", className)} {...props} />
  )
);
AccordionItem.displayName = "AccordionItem";

type AccordionTriggerProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Trigger> & {
  className?: string;
  children: React.ReactNode;
};

const AccordionTrigger = React.forwardRef<HTMLButtonElement, AccordionTriggerProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Header className="flex">
      <AccordionPrimitive.Trigger
        ref={ref}
        className={cn(
          "flex flex-1 items-center justify-between py-4 text-sm font-medium transition-all hover:underline text-left [&[data-state=open]>svg]:rotate-180",
          className
        )}
        {...props}
      >
        {children}
        <ChevronDown className="h-6 w-6 shrink-0 text-[#979797] text-muted-foreground transition-transform duration-200" />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
);
AccordionTrigger.displayName = AccordionPrimitive.Trigger.displayName;

type AccordionContentProps = React.ComponentPropsWithoutRef<typeof AccordionPrimitive.Content> & {
  className?: string;
  children: React.ReactNode;
};

const AccordionContent = React.forwardRef<HTMLDivElement, AccordionContentProps>(
  ({ className, children, ...props }, ref) => (
    <AccordionPrimitive.Content
      ref={ref}
      className="overflow-hidden text-sm data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down"
      {...props}
    >
      <div className={cn("pb-4 pt-0", className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
);
AccordionContent.displayName = AccordionPrimitive.Content.displayName;

interface AccordionCardProps {
  title: string;
  desc: string;
  video?: string;
  isOpen: boolean;
  onToggle: (state: boolean) => void;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ title, desc, video, isOpen, onToggle }) => {
  const [isDesktop, setIsDesktop] = React.useState(false);

  React.useEffect(() => {
    const checkSize = () => setIsDesktop(window.innerWidth >= 1024);
    checkSize();
    window.addEventListener("resize", checkSize);
    return () => window.removeEventListener("resize", checkSize);
  }, []);

  return (
    <motion.div
      layout
      initial={false}
      animate={{ height: isOpen ? "auto" : 126 }}
      transition={{ duration: 0.4, ease: "easeInOut" }}
      className={cn(
        "relative rounded-lg w-full overflow-hidden transition-colors duration-300 md:!h-[299px] lg:!h-[350px] text-[#333333]",
        isDesktop
          ? isOpen
            ? "bg-[#C2185B] text-white"
            : "bg-[#6666669C] text-white hover:bg-[#C2185B]"
          : "bg-[#C2185B] text-white"
      )}
      onMouseEnter={() => isDesktop && onToggle(true)}
      onMouseLeave={() => isDesktop && onToggle(false)}
    >
      {/* Header Row */}
      <div className="px-10 py-6 cursor-pointer" onClick={() => !isDesktop && onToggle(!isOpen)}>
        <h1 className="font-medium text-[24px] leading-snug text-left">{title}</h1>
      </div>

      {/* Chevron fixed to first line, right edge */}
      <div
        className="absolute top-8 right-4 md:right-6 cursor-pointer"
        onClick={() => !isDesktop && onToggle(!isOpen)}
      >
        {isOpen ? <ChevronUp className="w-5 h-5" /> : <ChevronDown className="w-5 h-5" />}
      </div>

      {/* Dropdown Content */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-10 pb-10 text-left"
          >
            <p className="text-sm">{desc}</p>
            {video && (
              <video
                src={video}
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-[200px] md:h-[157px] rounded-lg object-contain"
              />
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export { Accordion, AccordionItem, AccordionTrigger, AccordionContent, AccordionCard };
