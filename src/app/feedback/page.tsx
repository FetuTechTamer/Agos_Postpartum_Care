import { Metadata } from "next";
import FeedbackPageClient from "./FeedbackPageClient";

export const metadata: Metadata = {
  title: "Feedback | Agos Postpartum Care",
  description: "Share your feedback on the services you received from Agos Postpartum Care.",
};

export default function FeedbackPage() {
  return <FeedbackPageClient />;
}
