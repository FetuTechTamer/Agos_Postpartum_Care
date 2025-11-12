"use client";

import { useState, useEffect } from "react";
import { useTheme } from "next-themes";

const NewsLatterBox = () => {
  const { theme } = useTheme();
  const [isClient, setIsClient] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");
  const [step, setStep] = useState<"email" | "otp" | "subscribed">("email");

  const [otpTries, setOtpTries] = useState(0);
  const [blockUntil, setBlockUntil] = useState<number | null>(null);

  useEffect(() => setIsClient(true), []);

  // Auto-remove messages after 5 seconds
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
        setStatus("");
      }, 5000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  // Reset form after successful subscription
  useEffect(() => {
    if (step === "subscribed") {
      const timer = setTimeout(() => {
        setName("");
        setEmail("");
        setOtp("");
        setMessage("");
        setStatus("");
        setStep("email");
        setOtpTries(0);
        setBlockUntil(null);
      }, 7000); 
      return () => clearTimeout(timer);
    }
  }, [step]);

  if (!isClient) return null;

  // Step 1: Send OTP
  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name) return setMessage("Please enter your name.");
    if (!email) return setMessage("Please enter your email.");

    setMessage("Sending OTP...");
    setStatus("");

    try {
      const response = await fetch(
        "http://localhost/Agos_Postpartum_Care/api/send_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      setStatus(data.status);
      if (data.status === "success") setStep("otp");
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
      setStatus("error");
    }
  };

  // Step 2: Verify OTP
  const handleVerifyOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!otp) return setMessage("Please enter the OTP.");

    setMessage("Verifying OTP...");
    setStatus("");

    try {
      const response = await fetch(
        "http://localhost/Agos_Postpartum_Care/api/verify_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ email, otp }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      setStatus(data.status);

      if (data.status === "success") setStep("subscribed");
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
      setStatus("error");
    }
  };

  // Step 3: Resend OTP with 2 tries limit + 24h block
  const handleResendOtp = async () => {
    if (!email) return setMessage("Please enter your email first.");

    const now = Date.now();
    if (blockUntil && now < blockUntil) {
      const hoursLeft = Math.ceil((blockUntil - now) / (1000 * 60 * 60));
      setMessage(`You can try again in ${hoursLeft} hour(s).`);
      setStatus("error");
      return;
    }

    if (otpTries >= 2) {
      setBlockUntil(now + 24 * 60 * 60 * 1000);
      setMessage("Maximum OTP attempts reached. Try again after 24 hours.");
      setStatus("error");
      return;
    }

    setMessage("Resending OTP...");
    setStatus("");

    try {
      const response = await fetch(
        "http://localhost/Agos_Postpartum_Care/api/send_otp.php",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name, email }),
        }
      );
      const data = await response.json();
      setMessage(data.message);
      setStatus(data.status);

      if (data.status === "success") setOtpTries(otpTries + 1);
    } catch (err) {
      setMessage("Something went wrong. Try again later.");
      setStatus("error");
    }
  };

  return (
    <div className="shadow-three dark:bg-gray-dark relative z-10 rounded-xs bg-white p-8 sm:p-11 lg:p-8 xl:p-11">
      <h3 className="mb-4 text-2xl leading-tight font-bold text-black dark:text-white">
        Subscribe for Updates on Postpartum Care
      </h3>
      <p className="border-body-color/25 text-body-color mb-11 border-b pb-11 text-base leading-relaxed dark:border-white/25">
        Stay informed about our services, expert tips, and resources to support you through your postpartum journey.
      </p>

      {step === "email" && (
        <form onSubmit={handleSendOtp}>
          <input
            type="text"
            name="name"
            placeholder="Enter your name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="mb-4 border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
          />
          <input
            type="email"
            name="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mb-4 border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
          />
          <input
            type="submit"
            value="Send OTP"
            className="bg-primary shadow-submit hover:bg-primary/90 mb-3 flex w-full cursor-pointer items-center justify-center rounded-xs px-9 py-4 text-white"
          />
        </form>
      )}

      {step === "otp" && (
        <form onSubmit={handleVerifyOtp}>
          <input
            type="text"
            name="otp"
            placeholder="Enter OTP"
            value={otp}
            onChange={(e) => setOtp(e.target.value)}
            className="mb-4 border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
          />
          <input
            type="submit"
            value="Verify OTP"
            className="bg-primary shadow-submit hover:bg-primary/90 mb-3 flex w-full cursor-pointer items-center justify-center rounded-xs px-9 py-4 text-white"
          />
          <input
            type="button"
            value="Resend OTP"
            onClick={handleResendOtp}
            className="bg-primary shadow-submit hover:bg-primary/90 mb-3 flex w-full cursor-pointer items-center justify-center rounded-xs px-9 py-4 text-white"
          />
        </form>
      )}

      {message && (
        <p
          className={`text-center text-base mb-3 ${
            status === "success" ? "text-green-600" : "text-red-600"
          }`}
        >
          {message}
        </p>
      )}

      {status === "success" && step === "subscribed" && (
        <div className="text-center py-8">
          <p className="text-green-600 text-xl font-semibold">🎉 You are subscribed!</p>
          <p className="text-body-color dark:text-body-color-dark mt-2">
            Thank you, {name}, for subscribing!
          </p>
        </div>
      )}

      <p className="text-body-color dark:text-body-color-dark text-center text-base leading-relaxed">
        spam guaranteed! We respect your privacy and will only send relevant information.
      </p>
    </div>
  );
};

export default NewsLatterBox;
