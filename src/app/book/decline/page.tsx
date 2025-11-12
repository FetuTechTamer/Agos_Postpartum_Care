"use client";

import Image from "next/image";
import { useState } from "react";
import { useRouter } from "next/navigation";

type BookingInfo = {
  id: string;
  booking_code: string;
};

interface DeclineBookPageProps {
  bookingInfo: BookingInfo;
}

const DeclineBookPage = ({ bookingInfo }: DeclineBookPageProps) => {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const router = useRouter();
  const [loading, setLoading] = useState(false);

const handleResubmit = async () => {
  if (!bookingInfo.id) {
    alert("Booking ID is missing!");
    return;
  }

  try {
    const response = await fetch("http://localhost/Agos_Postpartum_Care/api/deleteDeclineBook.php", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ bookingId: bookingInfo.id }),
    });

    if (!response.ok) throw new Error("Server returned " + response.status);

    const data = await response.json();

    if (data.status === "success") {
      // Remove old booking info from localStorage
      localStorage.removeItem("bookingData"); // or the exact key you store it under

      // Redirect to new booking form
      router.push("/book"); 
    } else {
      alert("Error: " + data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Something went wrong! " + err);
  }
};

  return (
    <section className="py-16 md:py-20 lg:py-28 bg-gray-100 dark:bg-gray-800">
      <div className="container mx-auto flex flex-col lg:flex-row items-center gap-10">
        <div className="lg:w-1/2 text-center lg:text-left">
          <div className="flex justify-center lg:justify-start gap-4 mb-6">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-md font-medium ${
                language === "en" ? "bg-primary text-white" : "bg-gray-200 text-black"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("am")}
              className={`px-4 py-2 rounded-md font-medium ${
                language === "am" ? "bg-primary text-white" : "bg-gray-200 text-black"
              }`}
            >
              አማርኛ
            </button>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 text-black dark:text-white">
            {language === "en" ? "Booking Declined" : "ቅድመ ቅጽ ተከልክሏል"}
          </h1>

          <p className="mb-4 text-base font-medium text-body-color dark:text-gray-300">
            {language === "en"
              ? "Unfortunately, your booking request was declined. Please review your details and resubmit."
              : "ይቅርታ፣ የእርስዎ የቅድመ ቅጽ ጥያቄ ተከልክሏል። ዝርዝሮቹን ይጠብቁ እና አዲስ ጥያቄ ያስገቡ።"}
          </p>

          <p className="mb-4 text-base font-medium text-body-color dark:text-gray-300">
            {language === "en"
              ? "For assistance, call our support:"
              : "ለእገዛ ቀጥታ ወደ ድጋፍ ቡድን ይደውሉ፦"}
          </p>

          <p className="mb-6 text-base font-medium text-body-color dark:text-gray-300">
            +251 967 621 545 | +251 980 040 468
          </p>

          <button
            onClick={handleResubmit}
            disabled={loading}
            className="px-6 py-3 bg-primary hover:bg-primary/90 text-white rounded-full transition disabled:opacity-50"
          >
            {loading
              ? language === "en" ? "Deleting..." : "ማጥፋት በማድረግ..."
              : language === "en"
              ? "Resubmit Booking"
              : "አዲስ ቅጽ ያስገቡ"}
          </button>
        </div>

        <div className="lg:w-1/2 relative w-full h-96">
          <Image
            src="/images/about/about-image.png"
            alt="Declined Booking"
            fill
            className="rounded-lg object-cover shadow-lg"
          />
        </div>
      </div>
    </section>
  );
};

export default DeclineBookPage;
