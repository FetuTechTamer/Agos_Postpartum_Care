import { Metadata } from "next";
import BlogPageClient from "./BlogPageClient";

export const metadata: Metadata = {
  title: "Blog | Agos Postpartum Care",
  description:
    "Discover insights, tips, and inspiring stories for new mothers. Explore our blog on postpartum care, wellness strategies, and emotional support.",
};

export default function BlogPage() {
  return <BlogPageClient />;
}
