"use client";

import Image from "next/image";
import { useState } from "react";

type BookingInfo = {
  id: string;
  booking_code: string;
};

interface PendingBookPageProps {
  bookingInfo: BookingInfo;
}

const PendingBookPage = ({ bookingInfo }: PendingBookPageProps) => {
  const [language, setLanguage] = useState<"en" | "am">("en");

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        {/* Left Column */}
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start gap-4 mb-6">
            <button onClick={() => setLanguage("en")} className={`px-4 py-2 rounded-md font-medium ${language === "en" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}>English</button>
            <button onClick={() => setLanguage("am")} className={`px-4 py-2 rounded-md font-medium ${language === "am" ? "bg-primary text-white" : "bg-gray-200 text-black"}`}>አማርኛ</button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            {language === "en" ? "Booking Pending" : "ቅድመ ቅጽ በመጠበቅ ላይ"}
          </h1>

          <p className="mb-6 text-base font-medium text-body-color dark:text-gray-300">
            {language === "en"
              ? `Your booking request is under review. Please wait patiently until admin approval. If it takes more than 30 minutes, please call our support team:`
              : `የቦታ ማስያዝ ጥያቄዎ በግምገማ ላይ ነው። እባክዎ የአስተዳዳሪው ፈቃድ እስኪያገኝ ድረስ በትዕግስት ይጠብቁ። ከ30 ደቂቃ በላይ ከሆነ እባክዎ ቀጥታ ወደ ድጋፍ ቡድናችን ይደውሉ፦`}
          </p>

          <p className="mb-10 text-base font-medium text-body-color dark:text-gray-300">
            +251 967 621 545  |  +251 980 040 468
          </p>
        </div>

        {/* Right Column */}
        <div className="lg:w-1/2 relative w-full h-96">
          <Image
            src="/images/about/about-image.png"
            alt="Pending Booking"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default PendingBookPage;
