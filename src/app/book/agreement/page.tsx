"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

const ClientAgreement = () => {
  const [language, setLanguage] = useState<"en" | "am">("en");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const form = e.currentTarget;
    const formData = new FormData(form);
    formData.append("language", language);

    const fullName = formData.get("fullName")?.toString().trim() || "";
    const phone = formData.get("phone")?.toString().trim() || "";

    if (!fullName || !phone) {
      showMessage(
        language === "am"
          ? "እባክዎን የሚያስፈልጉትን ሁሉ ይሙሉ።"
          : "Please fill in all required fields."
      );
      setStatus("error");
      return;
    }

    // 🔹 Read booking ID from localStorage
    let booking_id: string | null = null;
    const bookingDataStr = localStorage.getItem("bookingData");
    if (bookingDataStr) {
      try {
        const bookingData = JSON.parse(bookingDataStr);
        booking_id = bookingData.id || null;
      } catch (err) {
        console.error("Error parsing bookingData from localStorage:", err);
      }
    }

    if (!booking_id) {
      showMessage(
        language === "am" ? "የቦት መለያ አልተገኘም።" : "Booking ID not found."
      );
      setStatus("error");
      return;
    }

    formData.append("booking_id", booking_id);

    try {
      setIsSubmitting(true);
      const response = await fetch(
        "http://localhost/Agos_Postpartum_Care/api/agreement.php",
        {
          method: "POST",
          body: formData,
        }
      );

      const data = await response.json();
      setStatus(data.status === "success" ? "success" : "error");
      showMessage(data.message);

      if (data.status === "success") {
        form.reset();
        localStorage.removeItem("bookingData"); // ✅ Clear local storage
        setSubmitted(true); // ✅ Hide the form
        // ✅ Redirect immediately
        router.push("/book/agreementSuccess");
      }
    } catch (error) {
      console.error(error);
      setStatus("error");
      showMessage(
        language === "am"
          ? "አንድ ስህተት ተፈጥሯል። እባክዎን ደግመው ይሞክሩ።"
          : "Something went wrong. Please try again."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const showMessage = (msg: string) => {
    setMessage(msg);
    clearMessageAfterDelay();
  };

  const clearMessageAfterDelay = () => {
    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);
  };

  // ✅ Hide form after success
  if (submitted) {
    return null;
  }

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="mx-auto max-w-5xl shadow-three dark:bg-dark rounded-sm bg-white px-6 py-10 sm:p-[60px]">

          {/* Language Toggle */}
          <div className="flex justify-end mb-6">
            <button
              onClick={() => setLanguage("en")}
              className={`px-4 py-2 rounded-l ${
                language === "en"
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              English
            </button>
            <button
              onClick={() => setLanguage("am")}
              className={`px-4 py-2 rounded-r ${
                language === "am"
                  ? "bg-primary text-white"
                  : "bg-gray-200 dark:bg-gray-700"
              }`}
            >
              አማርኛ
            </button>
          </div>

          {language === "en" ? (
            <>
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                AGOS Postpartum Care Service Agreement
              </h3>
              <p className="mb-10 text-center text-base font-medium text-body-color">
                Please read the agreement carefully and complete the required information below.
              </p>

              {/* Agreement Content */}
              <div className="mb-10 max-h-[600px] lg:max-h-[800px] overflow-y-scroll border border-gray-200 dark:border-gray-700 rounded-md p-4 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent">
                <p>
                  This service agreement is between <strong>AGOS Postpartum Care</strong> ("Service Provider")  
                  Address: <strong>Addis Ababa, Ethiopia</strong>, Sub City: <strong>Arada</strong>, Woreda: <strong>02</strong>, 
                  House No.: <strong>613</strong>, Tel: <strong>0967621545</strong>, hereinafter "Service Provider".
                </p>
                <br />
                <p>
                  And Mr/Ms ______________________________ Address __________ Sub City ________ Woreda ______
                  House No. ______ Tel No. __________, hereinafter "the Client".
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">Article One: About Terms</h4>
                <p>The Service Provider provides the following services:</p>
                <p>
                  The Service provider is provide the following; Welcoming Decor (for the mother return home), 
                  Nanny Services (daytime and/or nighttime care for newborn), Chef Checkups (nutritious meals 
                  tailored to postpartum recovery), Nurse Checkups (basic maternal and newborn health checks) 
                  and certified Nutritionist Guidance, Professional Postpartum Massage all this service is provided 
                  by the service provider the client shall order and select the services and paid by the employee the 
                  numbers and services the client shall pay per employee.
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Two: Service Provider Obligations</h4>
                <ul className="pl-6 space-y-1">
                  <li>2.1 Service provider offers the employees in accordance with the specific price.</li>
                  <li>2.2 If the assigned worker is absent, the service provider will replace them within 48 hours upon request.</li>
                  <li>2.3 Service Provider provides the client with the assigned workers' name list in writing.</li>
                  <li>
                    2.4 Regarding the service provider’s workers:
                    <ul className="pl-8 space-y-1">
                      <li>2.4.1 Before engagement, the service provider is responsible for providing proper orientation regarding general work conditions.</li>
                      <li>2.4.2 The service provider is fully responsible for any damage or rights issues related to assigned workers.</li>
                      <li>2.4.3 It is not permitted to provide fewer or more employees than specified in the job description.</li>
                      <li>2.4.4 Workers must be competent, healthy, and free from addiction. If complaints arise, a qualified replacement will be provided within 48 hours.</li>
                      <li>2.4.5 The service provider will assign a controller or maintain phone contact as needed to assist services.</li>
                      <li>2.4.6 The client will pay 50% advance on the signed contract date, and the remaining payment on the assigned worker’s start date.</li>
                      <li>2.4.7 Assigned workers must be between 20 and 60 years old.</li>
                      <li>2.4.8 If appropriate service is not received, only the days of service provided will be charged; the remaining amount will be refunded.</li>
                      <li>2.4.9 If the client rejects workers without valid reason, payment is non-refundable.</li>
                    </ul>
                  </li>
                </ul>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Three: Client Obligations</h4>
                <ul className="pl-6 space-y-1">
                  <li>3.1 Pay the service fee when the service is rendered as per the contract.</li>
                  <li>3.2 Inform the service provider in writing or by telephone of the client’s residence location.</li>
                  <li>3.3 Provide all necessary equipment required for the service.</li>
                  <li>3.4 Provide a clothing change area for workers.</li>
                  <li>3.5 Notify the service provider if additional service time is required.</li>
                  <li>
                    3.6 The client is responsible for storing and safeguarding valuables such as jewelry, gold, and diamonds.
                    <ul className="pl-8 space-y-1">
                      <li>3.6.1 The client is responsible for safeguarding any other property not mentioned above when service providers are assigned.</li>
                    </ul>
                  </li>
                  <li>
                    3.7 The service provider is not responsible for losses due to client negligence.
                    <ul className="pl-8 space-y-1">
                      <li>3.7.1 If due care is taken, the organization is liable for any loss caused by the service provider’s employees.</li>
                    </ul>
                  </li>
                  <li>3.8 If the client continues the service independently, one-third of the fee is payable to the service provider.</li>
                  <li>3.9 If the client continues with assigned workers independently, the service provider is not responsible for damages or disagreements.</li>
                  <li>3.10 If the service is canceled after paying the advance, a 25% cancellation fee applies.</li>
                  <li>3.11 Daily meals are provided by caregivers from their homes; the client must provide hygiene materials and hot drinks.</li>
                </ul>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Four: Annex</h4>
                <ul className="pl-6 space-y-1">
                  <li>4.1 LETER OF THE AWARDS(AWARDS) or other questionnaires/documents related to the service.</li>
                  <li>4.2 The employee's job description is part of this contract.</li>
                </ul>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Five: Governing Laws</h4>
                <p>
                  Under this contract is not covered the Ethiopian Civil and business law enforced in unexpected issues.
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Six: Grounds of Termination</h4>
                <ul className="pl-6 space-y-1">
                  <li>6.1 If the client requests services, the provider will respond within 24 hours.</li>
                  <li>6.2 When the service provider is unable to control employees.</li>
                  <li>One side of the obligations that any of the obligations of the commencer invites the service 
                      provider or any of the paragraphs quoted in the contract can also end the contract by giving the 
                      other 3 (three days) writing notice.
                  </li>
                </ul>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Seven: Contract Period</h4>
                <p>
                  This Contract is effective from --------------------, up to ------------------- valid. In accordance 
                  article six  A party who wants to break the contract with the above reasons must be give writing 
                  notice 5 (five) day of which you want to break the contract in some of the reasons. 
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">Article Eight: Settlement of Disputes</h4>
                <p>
                 Any dispute arising out of or in connection with this agreement shall be amicably settled by the 
                two parties through negotiation. If the case is not settled amicably through negotiation, the 
                dispute shall be settled by Ethiopian regular federal competent court. 
                </p>
              </div>
            </>
          ) : (
            // 🔹 Amharic version placeholder
            <>
              <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
                የአጎስ ድህረ ወሊድ እንክብካቤ የአገልግሎት ስምምነት
              </h3>
              <p className="mb-10 text-center text-base font-medium text-body-color">
                እባክዎ ውሉን በጥንቃቄ ያንብቡ እና ከዚህ በታች ያሉትን አስፈላጊ መረጃዎች ይሙሉ።
              </p>

              {/* Agreement Content */}
              <div className="mb-10 max-h-[600px] lg:max-h-[800px] overflow-y-scroll border border-gray-200 dark:border-gray-700 rounded-md p-4 text-sm text-gray-700 dark:text-gray-300 bg-white dark:bg-transparent">
                <p>
                  ይህ ውል ከዚህ በኋላ <strong>“ውል ሰጪ”</strong> ተብሎ በሚጠራው <strong>አጎስ ድህረ ወሊድ እንክብካቤ</strong>  
                  አዴራሻ፡- <strong>አዲስ አበባ, ኢትዮጵያ</strong>, ክ/ከተማ: <strong>አራዳ</strong>, ወረዳ: <strong>02</strong>, 
                  የቤት ቁጥር: <strong>613</strong>, ስልክ ቁጥር: <strong>0967621545</strong>, 
                  ከዚህ በኋላ ይህን በ “ውል ሰጪ” ተብሎ ይጠራል።
                </p>

                <br />
                <p>
                  እና ከዚህ በኋላ “ውል ተቀባይ” ተብሎ በሚጠራው-----------------አድራሻ፡- አ.አ. ከተማ-----------ክ/ከተማ ስልክ ቁጥር ---------መካከለው የደህንነት እንክብካቤ አገልግሎት ለማግኘት የተደረገ የአገልግሎት ውል ስምምነት ነው።".
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ አንድ፡ ስለ ውል ይዘት</h4>
                <p>
                  አገልግሎት ሰጪ የድህረ ወሊድ እንክብካቤ አገልግሎት ሰጪ ተቋም ሲሆን ለአገልግሎት ተቀባይ 
                  በዚህ ውል ሊይ ለተጠቀሰው ጊዜ እና ክፍያ ከፍሎ አገልግሎቱን በመፈለጉ ለተወሰነ ጊዜ 
                  አገልግሎት ተቀባይ በሚኖርበት ቤት ውስጥ አገሌግልቱን ለማግኘት በአገልግሎት ሰጪ እና 
                  በአገልግሎት ተቀባይ መካከሌ ለተወሰነ ጊዜ የተደረገ የአገልግሎት ስምምነት ነው፡፡
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ ሁለት፡ ስምምነት </h4>
                <p>
                 የሰራተኞች ቁጥር እንደ ደንበኛው የስራ ዓይነት እና መጠን በአገልግሎት ተቀባይ ጥያቄ መሰረት 
                ከፍ እና ዝቅ የሚል ሆኖ አገልግሎት ሰጪ እያንዳንዱ ሰራተኛ የተመደበበት ስራ በተገቢው መንገድ
                በሚሰጠው የስራ መዘርዝር መሰረት በአገልግሎት ተቀባይ የሚከፈል የክፍያ መጠን----------------- 
                ብር ለ--------------------ጊዜ አገልግሎቱን የሚያገኝ ይሆናል፡፡ 

                አስፈሊጊ ሆኖ ከተገኘ ለሰራተኞቹ የጤና ዋስትና እንዲሁም ከስራ ጋር በተያያዘ ለሚፈጠር የጤና 
                እክል የሚገባ የጤና ዋስትናና በስራ ቦታና ጊዜ ለሚደርስ አደጋ የሚገባውን የአደጋ ዋስትና (Work 
                related health and accident insurance) የሚሸፈነው በአገልግሎት አቅራቢው ድርጅት ነው፡፡ 
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ ሦስት፡ የአገልግሎት አቅራቢ ግዳታዎች </h4>
                <ul className="pl-6 space-y-1">
                  <li>
                    3.1 አገልግሎት አቅራቢ ከአገልግሎት ተቀባይ በተሰጠው የስራ መዘርዘሮች (specification) መሰረት ሰራተኞቹን ከልዩ በተጠቀሰው ዋጋ ያቀርባል፡፡
                  </li>
                  <li>
                    3.2 የአገልግሎት አቅራቢ በውል የተካተቱትን ሰራተኞች ብቃት እንደተጠበቀ ሆኖ ክፍተት በሚፈጠር ጊዜ በተጠየቀ በ48 ሰአት ለአገልግሎት ተቀባይ ይተካል፡፡
                  </li>
                  <li>
                    3.3 አገልግሎት አቅራቢ ለአገልግሎት ተቀባይ የሰራተኞቹን የስም ዝርዝር በየስራ መደቡ በጽሁፍ ያስረክባል፡፡
                  </li>
                  <li>
                    3.4 አገልግሎት አቅራቢ የሚያቀርባቸውን ሰራተኞችን በተመለከተ፡፡
                    <ul className="pl-8 space-y-1">
                      <li>
                        3.4.1 አገልግሎት አቅራቢው የሚመደባቸው ሰራተኞች ስራ ከመጀመራታቸው በፊት ስለ ስራው አጠቃላይ ሁኔታ፣ ስለሚጠበቅባቸው የስራ ልምድና ስነ-ሥርዓት ተገቢው ማስገንዘቢያ "orientation" እንዲሰጣቸው ኃላፊነት አለበት፡፡
                      </li>
                      <li>
                        3.4.2 ሰራተኛው ከተመደበበት ስራ ጋር በተያያዘ ሊያደርሰው የሚችለውን ማንኛውም ዓይነት ጉዳት ወይም የመብት ጥያቄ በፈጠረ ጊዜ አቅራቢው ድርጅት በሙሉ ተጠያቂ ይሆናል፡፡
                      </li>
                      <li>
                        3.4.3 በስራ መደቡ ከተጠቀሰው የሰራተኛ ብዛት በታች ወይም በላይ ማቅረብ አይፈቀድም፡፡
                      </li>
                      <li>
                        3.4.4 የብቃት ማነስ፣ የጤና ችግር ያላቸውንና ማንኛውም አይነት ሱስ ተገዢ የሆኑ ሰራተኞችን ማቅረብ አይቻልም፡፡ መሰረታዊ ብቃት የሌላቸው ሰራተኞች ቢቀርቡና ቅሬታ ቢደርስ፣ አዲስ ብቃት ያላቸው ሰራተኞች በ48 ሰአት ውስጥ በአገልግሎት አቅራቢ ይተካሉ፡፡
                      </li>
                      <li>
                        3.4.5 አገልግሎት አቅራቢው ለአገልግሎት ተቀባይ የሚሰጠውን አገልግሎት በቀጣይ ክትትል በማድረግ እንዲያግዝ በአካላዊ ተቆጣጣሪ ወይም በስልክ ክትትል ይፈጽማል፡፡
                      </li>
                      <li>
                        3.4.6 አገልግሎት ተቀባይ 50% የአገልግሎቱን ክፍያ በውል በፈረመበት ቀን ይከፍላል፣ የቀረው 50% ደግሞ አገልግሎት ሰራተኞች ስራ ሲጀምሩ ይከፍላል፡፡
                      </li>
                    </ul>
                  </li>
                  <li>
                    3.5 አገልግሎት አቅራቢው የሚያቀርባቸው ሰራተኞች እድሜ ከ20 ዓመት እስከ 60 ዓመት ባለው ዕድሜ ገደብ ውስጥ መሆን አለባቸው፡፡
                  </li>
                  <li>
                    3.6 አገልግሎት አቅራቢ በሚመደባቸው ሰራተኞች ምክንያት አገልግሎት ተቀባይ ተገቢውን አገልግሎት ሳያገኝ ቢቀር፣ የተሰጠውን አገልግሎት ቀናት ብቻ ታስበው ይመለሳል፡፡
                  </li>
                  <li>
                    3.7 አገልግሎት ተቀባይ በራሱ ምክንያት የተመደበለትን አገልግሎት ሰጪ ሰራተኛ ካልቀበለ፣ ውልን በተሰናበተበት ጊዜ የከፈለውን ክፍያ መመለስ አይችልም፡፡ (ከህክምና ጋር የተያያዘ ጉዳይ ውጭ)
                  </li>
                </ul>


                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ አራት፡ አገልግሎት ተቀባይ ግዳታዎች </h4>
                <ul className="pl-6 space-y-1">
                  <li>
                    4.1 በውል መሰረት አስፈላጊ አገልግሎት ሲያገኝ የአገልግሎት ክፍያውን መክፈል አለበት፡፡
                  </li>
                  <li>
                    4.2 አገልግሎት አቅራቢው የሚያቀርባቸውን ሰራተኞች የሚመደቡትን አካባቢ ስም ለአገልግሎት ተቀባይ አስቀድመው በጽሁፍ ወይም በስልክ ማሳወቅ አለበት፡፡
                  </li>
                  <li>
                    4.3 ማንኛውም ለስራ የሚያስፈልጉ መሳሪያዎች በወቅቱ ማቅረብ አለበት፡፡
                  </li>
                  <li>
                    4.4 የማረፊያና የልብስ መቀየሪያ ቦታ አገልግሎት ማቅረብ አለበት፡፡
                  </li>
                  <li>
                    4.5 አገልግሎት ተቀባይ ተጨማሪ የአገልግሎት ጊዜ ከፈለገ ለአገልግሎት ሰጪ የጽሁፍ መልዕክት በመልክ ወይም በስልክ ያሳውቃል፡፡
                  </li>
                  <li>
                    4.6 አገልግሎት ተቀባይ አገልግሎት ሰጪ ሰራተኞች በሥራ ሲመደቡ እንደ ወርቅ፣ አለማዝ እና ሌሎች የከበሩ ዋጋ ያላቸው ጌጣ ጌጦችን በተገቢው መንገድ ማጠበቅና መጠበቅ ኃላፊነት አለበት፡፡
                    <ul className="pl-8 space-y-1">
                      <li>
                        4.6.1 አገልግሎት ተቀባይ አገልግሎት ሰጪ ሰራተኞች በሥራ ሲመደቡ በተራ ቁጥር 4.6 ውስጥ ከተገለጹት ውጪ ያሉ ላልች ማንኛውም ንብረት በተገቢው መንገድ ማጠበቅና መጠበቅ ኃላፊነት አለበት፡፡
                      </li>
                    </ul>
                  </li>
                  <li>
                    4.7 በተራ ቁጥር 4.6 ውስጥ በተገለጹት መሠረት አገልግሎት ተቀባይ ተገቢውን ጥንቃቄ ሳይያድርግ ቢቀር ኃላፊነቱን የሚወስደው ነው፡፡
                    <ul className="pl-8 space-y-1">
                      <li>
                        4.7.1 በተራ ቁጥር 4.6.1 ውስጥ በተገለጸው መሠረት አገልግሎት ተቀባይ ተገቢውን ጥንቃቄ አድርጎ የሚከሰት የንብረት መጥፋት በአገልግሎት ሰጪ ሰራተኞች ኃላፊነት ይወሰዳል፡፡
                      </li>
                    </ul>
                  </li>
                  <li>
                    4.8 አገልግሎት ተቀባይ የተመደቡትን ሰራተኞች በራሱ ይዞ መቀጠል የሚፈልግ ከሆነ ከአገልግሎት አቅራቢ የተሰጠውን አገልግሎት 1/3 (አንዴ ሶስተኛውን) ክፍያ ለአገልግሎት ሰጪ ይከፍላል፡፡
                  </li>
                  <li>
                    4.9 በተራ ቁጥር 4.8 መሠረት አገልግሎት ተቀባይ የተመደበውን ሰራተኛ በራሱ ይዞ የሚቀጠል ከሆነ እና በመካከላቸው ለሚፈጠሩ ማንኛውም አልመግባባቶች ወይም የተመደበው ሰራተኛ ለሚያጠፋው ጥፋት አገልግሎት አቅራቢ ኃላፊነት አይወስድም፡፡
                  </li>
                  <li>
                    4.10 አገልግሎት ተቀባይ ቅድመ ክፍያ ከከፈለ በኃላ በራሱ ምክንያት አገልግሎቱን ካቋረጡ 25% ውል ማቋረጫ ቅጣት ይከፍላል፡፡
                  </li>
                  <li>
                    4.11 ዕለታዊ ምግብ ተመላላሽ ሞግዚቶች ከቤታቸው ቋጥረው የሚመጡ ይሆናል፡፡ ትኩስ ነገሮችን ጊዜያዊ ንፅህና መጠበቂያ አስፈላጊ የሆኑ ቁሳቁሶችን ለማዘጋጀት አገልግሎት ተቀባይ ግዳታ ይሰጣል፡፡
                  </li>
                </ul>


                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ አምስት፡ የውሉ አካል ሆነው ስለሚቆጠሩ ሰነድች  </h4>
                <ul className="pl-6 space-y-1">
                  <li>
                    5.1 አገልግሎት አቅራቢው አገልግሎቱን እንደሚያቀርብ የሚገልጽ በአገልግሎት ተቀባይ የተጻፈው ደብዳቤ (letter of awards) ወይም ሌሎች መጠይቆች 
                  </li>
                  <li>
                    5.2 በአገልግሎት ተቀባይ የተዘጋጀው የሰራተኞች የስራ መዘርዝር የዚህ ውል አካል ነው፡፡
                  </li>
                </ul>


                <h4 className="font-semibold text-lg mt-4 text-center">አንቀጽ ስድስት፡ በውሉ አፈጻጸም ሊይ ተፈጻሚ ስለሚሆኑ ህጎች</h4>
                <p>
                  በዚህ ውል ውስጥ ባለተሸፈኑ ጉዲዮች ሊይ  አግባብነት  ያላቸው የኢትዮጵያ የፍትሀብሄር ህግና የንግዴ ህግ ተፈጻሚ ይሆናለ፡፡
                </p>

                <h4 className="font-semibold text-lg mt-4 text-center">
                  አንቀጽ ሰባት፡ ውል የሚቋረጥባቸው ምክንያቶች
                </h4>
                <ul className="pl-6 space-y-1">
                  <li>
                    7.1. አገልግሎት ተቀባዩ የሚፈልጋቸውን ምትክ ሰራተኞችን እንዲያቀርብለት  
                   አገልግሎት አቅራቢውን በጠየቀው በ48 ሰአት ውስጥ በተደጋጋሚ ማቅረብ ያልቻለ እንደሆነ
                  </li>
                  <li>
                    7.2. አገልግሎት አቅራቢው ያሰማራቸውን ሰራተኞች በቅርበት መቆጣጠር ሳይችል ሲቀር
                  </li>
                  <li>
                    7.3. ማንኛውም የውሉን መንፈስ የሚቀይር ግዴታ አገልግሎት አቅራቢው ወይም አገልግሎት 
                    ተቀባይ ካቀረቡ እና በዚህ ውል ውስጥ የተጠቀሱት ማናቸውም አንቀጾች ተጥሰው ከተገኙ 
                    አንደኛው ወገን ለሌላኛው የ3 (ሦስት) ቀን ቅድሚያ ማስጠንቀቂያ በመስጠት ውልን ሊያቋርጥ 
                    ይችላል፡፡
                  </li>
                </ul>


                <h4 className="font-semibold text-lg mt-4 text-center">
                  አንቀጽ ስምንት፡ ውሉ የሚጸናበት ጊዜ
                </h4>
                <ul className="pl-6 space-y-1">
                  <li>
                    8.1. ይህ ውል ከ ………ወር-------- ቀን -------- ዓ.ም ጀምሮ  
                    ለ------------------ ቀናት የጸና ይሆናል፡፡  
                    በአንቀጽ 7 ከተገለጹት ምክንያቶች ውጪ በሆነ  
                    መነሻ ውልን ለማፍረስ የሚፈለግ ወገን የ5 (የአምስት) ቀን  
                    የጽሁፍ ማስጠንቀቂያ በቅዴሚያ መስጠት ይኖርበታል፡፡
                  </li>
                </ul>

                <h4 className="font-semibold text-lg mt-4 text-center">
                  አንቀጽ ዘጠኝ፡ አለመግባባት ቢፈጠር
                </h4>
                <p className="text-justify mt-2">
                  ይህ ውል የተፈጸመው የኢትዮጵያን የውል ህግ ዴንጋጌዎች አገናዝቦ  
                  በመሆኑ አለመግባባት ቢፈጠር በስምምነት እንዱያሌቅ ይደረጋል፡፡  
                  በስምምነት መፍታት ባይቻል ግን መብቴን አስከብራለሁ የሚለው ወገን  
                  ከሊይ የተጠቀሱትን የውል አንቀጾች አግባብ ካለው ህግ ጋር በማገናዘብ  
                  የበኩል ህጋዊ እርምጃ ይወስዳል፡፡
                </p>


              </div>
            </>
          )}
          <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "ሙሉ ስም *" : "Full Name *"}
              </label>
              <input
                type="text"
                name="fullName"
                required
                placeholder={language === "am" ? "ሙሉ ስምዎን ያስገቡ" : "Enter your full name"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "አድራሻ *" : "Address *"}
              </label>
              <input
                type="text"
                name="address"
                required
                placeholder={language === "am" ? "አድራሻዎን ያስገቡ" : "Enter your address"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "ክ/ከተማ *" : "Sub City *"}
              </label>
              <input
                type="text"
                name="subCity"
                required
                placeholder={language === "am" ? "ክ/ከተማዎን ያስገቡ" : "Enter your Sub City"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "ወረዳ *" : "Woreda *"}
              </label>
              <input
                type="text"
                name="woreda"
                required
                placeholder={language === "am" ? "ወረዳዎን ያስገቡ" : "Enter your Woreda"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "የቤት ቁጥር *" : "House Number *"}
              </label>
              <input
                type="text"
                name="houseNumber"
                required
                placeholder={language === "am" ? "የቤት ቁጥርዎን ያስገቡ" : "Enter your House Number"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                {language === "am" ? "የስልክ ቁጥር *" : "Phone Number *"}
              </label>
              <input
                type="tel"
                name="phone"
                required
                placeholder={language === "am" ? "የስልክ ቁጥርዎን ያስገቡ" : "Enter your Phone Number"}
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            <div className="md:col-span-2 flex items-center gap-3">
              <input type="checkbox" name="agree" required className="w-5 h-5 accent-primary" />
              <label className="text-sm text-dark dark:text-white">
                {language === "am"
                  ? "የአገልግሎት ስምምነቱን አንብቤአለሁ እና ተስማምቻለሁ።"
                  : "I have read and agree to the terms and conditions of this Service Agreement."}
              </label>
            </div>

            {/* Submit Button */}
            <div className="md:col-span-2">
              <button
                type="submit"
                disabled={isSubmitting}
                className="bg-primary hover:bg-primary/90 w-full rounded-xs px-9 py-4 text-base font-medium text-white duration-300 disabled:opacity-60"
              >
                {isSubmitting
                  ? language === "am"
                    ? "በመላክ ላይ..."
                    : "Submitting..."
                  : language === "am"
                  ? "የስምምነት ማስገቢያ"
                  : "Submit Agreement"}
              </button>
            </div>

            {/* Status Message */}
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

export default ClientAgreement;
