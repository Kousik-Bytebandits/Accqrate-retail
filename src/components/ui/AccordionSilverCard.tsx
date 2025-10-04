import * as React from "react";
import {
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "../ui/accordion";

interface AccordionCardProps {
  value: string;
  icon: string;
  title: string;
  children: React.ReactNode;
}

const AccordionCard: React.FC<AccordionCardProps> = ({ value, icon, title, children }) => {
  return (
    <AccordionItem
      value={value}
      className="flex flex-col justify-center bg-gradient-to-r from-[#E6E6E6] to-[#C8C8C8] w-full h-auto rounded-lg p-[24px]"
    >
      <AccordionTrigger className="flex justify-between items-start w-full hover:no-underline">
        <div className="flex flex-col items-start gap-[24px]">
          <img
            src={icon}
            alt={title}
            className="w-[45px] h-[45px] md:h-[34.56px] md:w-[31.75px]"
          />
          <span className="text-fluid-body text-left font-normal">{title}</span>
        </div>
      </AccordionTrigger>

      <AccordionContent className="px-1 pb-2 text-gray-700 text-sm">{children}</AccordionContent>
    </AccordionItem>
  );
};

export default AccordionCard;
