import Image from "next/image";
import React from "react";

export default function Sales() {
  const images = [
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

  const videoCards = [
    { title: "Barcode Scanning", src: "/videos/barcode.mp4", width: 500 },
    { title: "Flexible Payments", src: "/videos/Flexible Payments.mp4", width: 450 },
    { title: "Product Search by Attributes", src: "/videos/productsearch.mp4", width: 550 },
  ];

  return (
    <section className="bg-white text-center px-4 md:px-20 py-10">
      <h2 className="text-fluid-h2 font-normal mb-3 text-black">
        Supercharge Sales with <span className="text-[#C2185B]">Powerful POS</span> Capabilities
      </h2>
      <p className="text-[#000000B2] text-fluid-body max-w-2xl mx-auto mb-16">
        Empower your front-end team and delight your customers with
        <span className="font-bold"> intuitive, high-speed transactions:</span>
      </p>

      <div className="flex flex-col items-center relative">
        {/* Marquee Card */}
        <div
          className="sticky top-10 bg-white rounded-2xl shadow-lg p-6 max-w-4xl w-full z-10"
          style={{ minHeight: "500px" }}
        >
          <div className="text-2xl font-bold text-pink-700 text-center mb-5">
            10+ Promotions & Discount Engines
          </div>
          <div className="overflow-hidden w-full">
            <div className="flex gap-20 animate-marquee py-8">
              {images.concat(images).map((img, idx) => (
                <div key={idx} className="flex flex-col items-center min-w-[60px] gap-2">
                  <Image src={img.src} width={100} height={100} alt={img.label} />
                  <span className="text-lg font-bold text-gray-600">{img.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Video Cards */}
        {videoCards.map((card, idx) => (
          <div
            key={idx}
            className="sticky top-10 bg-white rounded-2xl shadow-lg  p-6 max-w-4xl w-full"
            style={{
             minHeight: "500px",
              zIndex: 20 + idx, // progressive stacking
            }}
          >
            <div className="text-fluid-h2 font-bold text-[#C2185B] text-center mb-5">{card.title}</div>
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

      {/* Marquee animation */}
      <style jsx>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .animate-marquee {
          display: flex;
          animation: marquee 10s linear infinite;
        }
      `}</style>
    </section>
  );
}
