"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

const AgreementSuccessPage = () => {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const router = useRouter();

  const handleGoToBook = () => {
    // ✅ Redirect to booking page after successful agreement
    router.push("/book");
  };

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Section */}
        <div className="lg:w-1/2 text-center lg:text-left">
          {/* Language Switch Buttons */}
          <div className="flex justify-center lg:justify-start gap-4 mb-6">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-md font-medium ${
                language === "en"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("am")}
              className={`px-4 py-2 rounded-md font-medium ${
                language === "am"
                  ? "bg-primary text-white"
                  : "bg-gray-200 text-black"
              }`}
            >
              አማርኛ
            </button>
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            {language === "en"
              ? "Agreement Submitted Successfully!"
              : "ስምምነቱ በተሳካ ሁኔታ ተላክ።"}
          </h1>

        {/* Description */}
        <p className="mb-6 text-base font-medium text-body-color dark:text-gray-300">
        {language === "en"
            ? "Thank you for choosing Agos Postpartum Care. Your journey with us marks a beautiful chapter in motherhood — one filled with care, healing, and support every step of the way. We’re honored to be part of this special time in your life."
            : "አጎስ ድህረ ወሊድ እንክብካቤ በመምረጥዎ እናመሰግናለን። ከእኛ ጋር ያለዎት ጉዞ የእናትነት በዓላት እና ተጠባባቂነት የተሞላ ክፍል ነው። በዚህ በተለየ ጊዜ ከእርስዎ ጋር መኖር እንደ ክብር እናውቃለን።"}
        </p>


          {/* Support Info */}
          <p className="mb-4 text-base font-medium text-body-color dark:text-gray-300">
            {language === "en"
              ? "Need help? Contact our support team:"
              : "እርዳታ ይፈልጋሉ? ድጋፍ ቡድናችንን ያነጋግሩ፦"}
          </p>

          <p className="mb-6 text-base font-medium text-body-color dark:text-gray-300">
            +251 967 621 545 | +251 980 040 468
          </p>

          {/* Go to Booking Button */}
          <button
            onClick={handleGoToBook}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition"
          >
            {language === "en"
              ? "Return to Booking Page"
              : "ወደ ቅድመ ቅጽ ገጽ ይመለሱ"}
          </button>
        </div>

        {/* Right Section (Image) */}
        <div className="lg:w-1/2 relative w-full h-96">
          <Image
            src="/images/about/about-image.png"
            alt="Agreement Success"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default AgreementSuccessPage;
