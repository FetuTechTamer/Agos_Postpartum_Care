// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";

// ---- Correct Type ----
interface BlogPageProps {
  params: { slug: string };
}

// ---- FIXED generateMetadata ----
export async function generateMetadata(
  { params }: BlogPageProps
): Promise<Metadata> {
  try {
    const res = await fetch(
      `http://localhost/Agos_Postpartum_Care/api/getBlogDetail.php?slug=${params.slug}`,
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
        "Explore postpartum care insights, stories, and support from Agos Postpartum Care.",
      openGraph: {
        title: blog?.title || "Agos Postpartum Care Blog",
        description:
          blog?.detail?.summary ||
          "Discover postpartum insights and support from Agos Postpartum Care.",
        images: [
          {
            url: blog?.detail?.detail_image || "/images/default-blog-image.jpg",
            width: 1200,
            height: 630,
            alt: blog?.title || "Agos Postpartum Care",
          },
        ],
      },
      twitter: {
        card: "summary_large_image",
        title: blog?.title || "Agos Postpartum Care Blog",
        description:
          blog?.detail?.summary ||
          "Discover postpartum insights and support from Agos Postpartum Care.",
        images: [blog?.detail?.detail_image || "/images/default-blog-image.jpg"],
      },
    };
  } catch (err) {
    console.error("Error generating metadata:", err);
    return {
      title: "Blog | Agos Postpartum Care",
      description: "Explore postpartum care insights and support.",
    };
  }
}

// ---- FIXED PAGE ----
export default function BlogDetailsPage({ params }: BlogPageProps) {
  return <BlogDetailsClient slug={params.slug} />;
}
