"use client";

import { useState, useEffect } from "react";
import BookPageClient from "./BookPageClient";
import PendingBookPage from "./pending/page";
import DeclineBookPage from "./decline/page";
import ApproveBookPage from "./approve/page";

type BookingInfo = {
  id: string;
  booking_code: string;
  status: "pending" | "declined" | "approved";
};

export default function BookPage() {
  const [bookingInfo, setBookingInfo] = useState<BookingInfo | null>(null);

  // Load from localStorage and refresh status from API
  useEffect(() => {
    const stored = localStorage.getItem("bookingData");
    if (stored) {
      const parsed: BookingInfo = JSON.parse(stored);
      setBookingInfo(parsed);

      // Fetch latest status from server
      fetch(`http://localhost/Agos_Postpartum_Care/api/getBookStatus.php?id=${parsed.id}`)
        .then(res => res.json())
        .then(data => {
          if (data.status === "success") {
            const latest = data.data;
            const updatedBooking: BookingInfo = {
              id: latest.id,
              booking_code: latest.booking_code,
              status: latest.status,
            };
            setBookingInfo(updatedBooking);
            localStorage.setItem("bookingData", JSON.stringify(updatedBooking));
          }
        })
        .catch(err => console.error("Failed to fetch booking status:", err));
    }
  }, []);

  if (!bookingInfo) return <BookPageClient setBookingInfo={setBookingInfo} />;

  switch (bookingInfo.status) {
    case "pending":
      return <PendingBookPage bookingInfo={bookingInfo} />;
    case "declined":
      return <DeclineBookPage bookingInfo={bookingInfo} />;
    case "approved":
      return <ApproveBookPage bookingInfo={bookingInfo} />;
    default:
      return <BookPageClient setBookingInfo={setBookingInfo} />;
  }
}
