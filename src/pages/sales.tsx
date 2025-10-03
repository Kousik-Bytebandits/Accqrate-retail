import Image from "next/image";
import React, { FC } from "react";

// IMPORT SCROLLREVEAL FOR TEXT ANIMATIONS
import ScrollReveal from "../components/ui/ScrollReveal";

interface ImageItem {
  src: string;
  label: string;
}

interface VideoCard {
  title: string;
  src: string;
  width: number;
}

const Sales: FC = () => {
  const images: ImageItem[] = [
    { src: "/images/discount.webp", label: "Discount" },
    { src: "/images/free.webp", label: "Buy 1 Get 1" },
    { src: "/images/flat.webp", label: "Flat Off" },
    { src: "/images/voucher.webp", label: "Combo" },
    { src: "/images/gift.webp", label: "Free Gift" },
    { src: "/images/coupon.webp", label: "Coupon" },
    { src: "/images/loyalty.webp", label: "Loyalty" },
    { src: "/images/sale.webp", label: "Flash Sale" },
    { src: "/images/membership.webp", label: "Membership" },
    { src: "/images/cashback.webp", label: "Cashback" },
  ];

  const videoCards: VideoCard[] = [
    { title: "Barcode Scanning", src: "/videos/barcode.mp4", width: 500 },
    { title: "Flexible Payments", src: "/videos/Flexible Payments.mp4", width: 450 },
    { title: "Product Search by Attributes", src: "/videos/productsearch.mp4", width: 550 },
  ];

  return (
    <section className="bg-white text-center px-24px md:px-[32px] mt-48px md:mt-[56px] text-[#333333]">
      <ScrollReveal
        as="h2"
        containerClassName="text-fluid-h2 font-medium tracking--5 mb-[24px]"
      >
        Supercharge Sales with <span className="text-[#C2185B]">Powerful POS</span> Capabilities
      </ScrollReveal>
      <ScrollReveal
        as="p"
        containerClassName="text-[#000000B2] leading-snug mb-[24px] md:mb-[32px] lg:mb-[40px] text-fluid-caption tracking--2 max-w-2xl mx-auto "
      >
        Empower your front-end team and delight your customers with
        <span className="font-bold"> intuitive, high-speed transactions:</span>
      </ScrollReveal>

      <div className="flex flex-col items-center relative">
        {/* MARQUEE CARD */}
        <div className="sticky h-[240px] md:h-[450px] bg-white border border-gray-400 rounded-2xl shadow-xl p-4 max-w-4xl w-full z-10">
          <div className="text-fluid-h3 leading-tight font-bold text-pink-700 text-center mb-5">
            10+ Promotions & Discount Engines
          </div>
          <div className="overflow-hidden w-full">
            <div className="flex gap-10 animate-marquee py-8">
              {images.concat(images).map((img, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[80px] gap-2">
                  <Image src={img.src} width={50} height={80} alt={img.label} />
                  <span className="text-sm font-bold text-gray-600">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* VIDEO CARDS */}
        {videoCards.map((card, idx) => (
          <div
            key={idx}
            className="sticky h-[300px] md:h-[450px] mt-24px border border-gray-400 top-10 bg-white rounded-2xl shadow-xl p-6 max-w-4xl w-full"
            style={{ zIndex: 20 + idx }}
          >
            <div className="text-fluid-h3 font-bold text-[#C2185B] text-center mb-5">{card.title}</div>
            <video
              src={card.src}
              muted
              autoPlay
              loop
              playsInline
              className="mx-auto w-full max-w-[500px] object-cover rounded-lg"
            />
          </div>
        ))}
      </div>

      {/* MARQUEE ANIMATION */}
      <style jsx>{`
        @keyframes marquee {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(-50%);
          }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default Sales;
