
import { useContext } from "react";
import { motion } from "framer-motion";
import { LoadingContext } from "../utils/LoadingContext";
import Skeleton from "../components/skeleton";
import CustomImage from "../components/Image";

export default function Built() {
  const { loading } = useContext(LoadingContext);

  const sectionClasses = "w-full bg-[#F2F2F2] mt-6 py-8";
  const containerClasses =
    "flex flex-col sm:text-center md:flex-row md:text-left justify-between max-w-[1300px] mx-auto gap-5 px-6 md:px-10";

  if (loading) {
    return (
      <section className={sectionClasses}>
        <div className={containerClasses}>
          <div className="flex flex-col justify-center flex-1">
            <Skeleton height="36px" width="60%" className="mb-4" />
            <Skeleton height="20px" width="80%" className="mb-3" />
            <Skeleton height="20px" width="80%" className="mb-3" />
          </div>
          <Skeleton height="350px" width="350px" className="mx-auto" />
        </div>
      </section>
    );
  }

  return (
    <section className={sectionClasses}>
      <div className={containerClasses}>
        {/* Text */}
        <motion.div
          className="flex flex-col justify-center flex-1"
          initial={{ opacity: 0, x: -50 }}   // start hidden, left
          whileInView={{ opacity: 1, x: 0 }} // fade in, slide right
          viewport={{ once: false, amount: 0.3 }} // animate every time in view
          transition={{ duration: 0.8 }}
        >
          <h2 className="text-fluid-h2 font-semibold text-[#C2185B] mb-2">
            Built-In{" "}
            <span className="text-[#C2185B] font-semibold">
              E-Invoicing Compliance
            </span>
          </h2>
          <p className="text-fluid-body text-black md:max-w-[500px] mb-1 sm:text-base">
            <span className="font-semibold text-black">100% ZATCA</span> phase 2
            compliance: Issue e-invoice receipts with every sale, no extra fees
          </p>
        </motion.div>

        {/* Image */}
        <motion.div
          className="sm:flex sm:justify-center w-auto"
          initial={{ opacity: 0, x: 50 }}    // start hidden, right
          whileInView={{ opacity: 1, x: 0 }} // fade in, slide left
          viewport={{ once: false, amount: 0.3 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <CustomImage
            src="/images/zatak.svg"
            alt="E-Invoice"
            width={350}
            height={350}
            className="h-[200px] md:h-[250px]"
          />
        </motion.div>
      </div>
    </section>
  );
}
