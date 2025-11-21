import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";

// FIXED types for Next.js 15.5
type BlogParams = Promise<{ slug: string }>;

export async function generateMetadata(
  { params }: { params: BlogParams }
): Promise<Metadata> {
  const { slug } = await params;

  try {
    const res = await fetch(
      `http://localhost/Agos_Postpartum_Care/api/getBlogDetail.php?slug=${slug}`,
      { cache: "no-store" }
    );

    const blog = await res.json();

    return {
      title: blog?.title
        ? `${blog.title} | Agos Postpartum Care`
        : "Blog | Agos Postpartum Care",
      description:
        blog?.detail?.summary ||
        blog?.detail?.content1?.slice(0, 150) ||
        "Explore postpartum care insights, stories, and support.",
    };
  } catch {
    return {
      title: "Blog | Agos Postpartum Care",
      description: "Explore postpartum care insights and support.",
    };
  }
}

export default async function BlogDetailsPage(
  { params }: { params: BlogParams }
) {
  const { slug } = await params;

  return <BlogDetailsClient slug={slug} />;
}
