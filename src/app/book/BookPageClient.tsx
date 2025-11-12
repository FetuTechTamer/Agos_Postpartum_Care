"use client";

import { useState, useEffect } from "react";

interface BookingInfo {
  id: string;
  booking_code: string;
  status: "pending" | "declined" | "approved";
}

interface BookPageClientProps {
  setBookingInfo: (info: BookingInfo) => void;
}

const BookPageClient = ({ setBookingInfo }: BookPageClientProps) => {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [bookingInfo, setLocalBookingInfo] = useState<BookingInfo | null>(null);

  // -----------------------------
  // Poll booking status from API
  // -----------------------------
  useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      const parsed: BookingInfo = JSON.parse(stored);
      setLocalBookingInfo(parsed);
      setBookingInfo(parsed); // update parent state

      const interval = setInterval(() => {
        fetch(`http://localhost/Agos_Postpartum_Care/api/getBookStatus.php?id=${parsed.id}&t=${Date.now()}`)
          .then(res => res.json())
          .then(data => {
            if (data.status === "success") {
              const latest = data.data;
              const updatedBooking: BookingInfo = {
                id: latest.id,
                booking_code: latest.booking_code,
                status: latest.status,
              };

              // Use functional update to avoid stale closure
              setLocalBookingInfo(prev => {
                if (prev?.status !== updatedBooking.status) {
                  setBookingInfo(updatedBooking); // update parent state
                  localStorage.setItem("bookingData", JSON.stringify(updatedBooking));
                  return updatedBooking;
                }
                return prev;
              });
            }
          })
          .catch(err => console.error("Failed to fetch booking status:", err));
      }, 5000); // every 5s

      return () => clearInterval(interval);
    }
  }, [setBookingInfo]);

  // -----------------------------
  // Auto clear message
  // -----------------------------
  const autoClearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);
  };

  // -----------------------------
  // Form submission
  // -----------------------------
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost/Agos_Postpartum_Care/api/book.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        const booking: BookingInfo = {
          id: data.id,
          booking_code: data.booking_code,
          status: "pending",
        };

        setLocalBookingInfo(booking);
        setBookingInfo(booking); // update parent
        localStorage.setItem("bookingData", JSON.stringify(booking));

        setStatus("success");
        setMessage(data.message);
        form.reset();

        setTimeout(() => {
          window.location.href = `/book`;
        }, 2000);
      } else {
        setStatus("error");
        setMessage(
          data.message || (language === "en" ? "Something went wrong." : "አንዳንድ ችግር ተፈጥሯል።")
        );
      }
      autoClearMessage();
    } catch (error) {
      console.error(error);
      setStatus("error");
      setMessage(language === "en" ? "Something went wrong." : "አንዳንድ ችግር ተፈጥሯል።");
      autoClearMessage();
    }
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="mx-auto max-w-5xl shadow-three dark:bg-dark rounded-sm bg-white px-6 py-10 sm:p-[60px]">

          {/* Language Toggle Buttons */}
          <div className="mb-6 flex justify-center gap-4">
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

          <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
            {language === "en" ? "Client Predelivery Intake Form" : "የደንበኛ ከትውልድ ቀደም መረጃ ቅጽ"}
          </h3>
          <p className="mb-10 text-center text-base font-medium text-body-color">
            {language === "en"
              ? "Please fill out all required fields (*) and upload payment proof"
              : "እባክዎን ሁሉንም አስፈላጊ መረጃዎች (*) ይሙሉ እና የክፍያ ማረጋገጫ ይጫኑ"}
          </p>

           <form
            onSubmit={handleSubmit}
            className="grid grid-cols-1 md:grid-cols-2 gap-8"
            encType="multipart/form-data"
          >
            {/* Full Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Full Name *" : "ሙሉ ስም *"}
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder={language === "en" ? "Enter your full name" : "ሙሉ ስምዎን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Home Address */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Home Address *" : "አድራሻ *"}
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder={language === "en" ? "Enter your Home Address" : "ሙሉ አድራሻዎን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Age */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Age *" : "እድሜ *"}
              </label>
              <input
                type="number"
                name="age"
                required
                placeholder={language === "en" ? "Enter your age" : "እድሜዎን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Phone Number */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Phone Number *" : "የስልክ ቁጥር *"}
              </label>
              <input
                type="text"
                name="phone"
                required
                placeholder={language === "en" ? "Enter your phone number" : "የስልክ ቁጥርዎን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Expected Due Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Expected Due Date *" : "የተጠበቀ የመውለጃ ቀን *"}
              </label>
              <input
                type="date"
                name="dueDate"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Weight Before Pregnancy */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Weight Before Pregnancy (Kg) *" : "ከእርግዝና በፊት ክብደት (ኪ.ግ) *"}
              </label>
              <input
                type="number"
                name="weightBefore"
                required
                placeholder={language === "en" ? "Kg" : "ኪ.ግ"}
                step="0.01"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Current Weight */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Current Weight (Kg) *" : "የአሁኑ ክብደት (ኪ.ግ) *"}
              </label>
              <input
                type="number"
                name="currentWeight"
                required
                placeholder={language === "en" ? "Kg" : "ኪ.ግ"}
                step="0.01"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Delivery Type */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Type of Delivery (If Known) *" : "የልደት ዓይነት (ከታወቀ) *"}
              </label>
              <select
                name="deliveryType"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="normal">{language === "en" ? "Normal" : "መደበኛ"}</option>
                <option value="cesarean">{language === "en" ? "Cesarean" : "ሴሳሪያን"}</option>
                <option value="unknown">{language === "en" ? "Not Sure" : "አልታወቀም"}</option>
              </select>
            </div>

            {/* Gender of Baby */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Gender of the Newborn Baby (If Known) *" : "የህፃን ፆታ (ከታወቀ) *"}
              </label>
              <select
                name="babyGender"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="male">{language === "en" ? "Male" : "ወንድ"}</option>
                <option value="female">{language === "en" ? "Female" : "ሴት"}</option>
                <option value="unknown">{language === "en" ? "Not Sure" : "አልታወቀም"}</option>
              </select>
            </div>
            
            {/* Dietary Preferences */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Dietary Preferences or Restrictions *" : "የምግብ ፍላጎቶች *"}
              </label>
              <input
                type="text"
                name="dietary"
                required
                placeholder={language === "en" ? "Enter dietary details" : "የምግብ ዝርዝሮችን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Pregnancy Complications */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Any Pregnancy Complications *" : "የእርግዝና አደጋ ሁኔታዎች ካሉ *"}
              </label>
              <textarea
                name="complications"
                required
                placeholder={language === "en" ? "Enter details if any" : "ዝርዝር ካለ ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Allergies */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Do you have any allergies? *" : "ማንኛውም አለርጂ አለዎት? *"}
              </label>
              <textarea
                name="allergies"
                required
                placeholder={language === "en" ? "Enter allergies if any" : "አለርጂ ካለ ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Breastfeeding */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Are you planning to breastfeed? *" : "የማጥባት እቅድ አለዎት? *"}
              </label>
              <select
                name="breastfeed"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="yes">{language === "en" ? "Yes" : "አዎ"}</option>
                <option value="no">{language === "en" ? "No" : "አይ"}</option>
                <option value="maybe">{language === "en" ? "Maybe" : "አማካይ"}</option>
              </select>
            </div>



            {/* Preferred Language */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Preferred Language *" : "ተመራጭ ቋንቋ *"}
              </label>
              <input
                type="text"
                name="language"
                required
                placeholder={language === "en" ? "Enter your language" : "ቋንቋዎን ያስገቡ"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Additional Notes */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Additional Notes or Instructions *" : "ተጨማሪ ማስታወሻዎች ወይም መመሪያዎች *"}
              </label>
              <textarea
                name="notes"
                required
                placeholder={language === "en" ? "Write additional notes here..." : "ተጨማሪ ማስታወሻዎችን እዚህ ያስገቡ..."}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* House Type */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "House Type *" : "የቤት ዓይነት *"}
              </label>
              <select
                name="houseType"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="villa">{language === "en" ? "Villa" : "ቪላ"}</option>
                <option value="g+1">{language === "en" ? "G+1" : "G+1"}</option>
                <option value="g+2">{language === "en" ? "G+2" : "G+2"}</option>
                <option value="g+3">{language === "en" ? "G+3" : "G+3"}</option>
                <option value="apartment">{language === "en" ? "Apartment" : "አፓርታማ"}</option>
                <option value="condominium">{language === "en" ? "Condominium" : "ኮንዶሚኒየም"}</option>
              </select>
            </div>

            {/* National ID Upload */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Upload National ID *" : "የፋይዳ መታወቂያ ያስገቡ *"}
              </label>
              <input
                type="file"
                name="nationalId"
                accept="image/*,.pdf"
                required
                className="w-full rounded-xs border border-stroke bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />
            </div>

            {/* Payment Screenshot Upload */}
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "en" ? "Upload Payment Screenshot *" : "የክፍያ ስክሪንሾት ማስገባት *"}
              </label>
              <input
                type="file"
                name="paymentScreenshot"
                accept="image/*,.pdf"
                required
                className="w-full rounded-xs border border-stroke bg-[#f8f8f8] px-4 py-2 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-white file:mr-4 file:rounded-md file:border-0 file:bg-primary file:px-4 file:py-2 file:text-white file:cursor-pointer"
              />
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button className="bg-primary hover:bg-primary/90 w-full rounded-xs px-9 py-4 text-base font-medium text-white duration-300">
                {language === "en" ? "Submit" : "አስገባ"}
              </button>
            </div>

            {/* Message */}
            {message && (
              <p
                className={`md:col-span-2 text-center mt-3 text-base font-medium ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>


        </div>
      </div>
    </section>
  );
  
};

export default BookPageClient;
