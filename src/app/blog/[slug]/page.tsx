// app/blog/[slug]/page.tsx
import { Metadata } from "next";
import BlogDetailsClient from "./BlogDetailsClient";

// Dynamic metadata per blog
export async function generateMetadata(
  { params }: { params: { slug: string } }
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
        "Explore postpartum care insights and support.",
      openGraph: {
        title: blog?.title || "Agos Postpartum Care Blog",
        description:
          blog?.detail?.summary ||
          "Discover postpartum insights and support.",
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
          "Discover postpartum insights and support.",
        images: [blog?.detail?.detail_image || "/images/default-blog-image.jpg"],
      },
    };
  } catch {
    return {
      title: "Blog | Agos Postpartum Care",
      description: "Explore postpartum care insights and support.",
    };
  }
}

// ❗ MUST receive params AND pass slug to client component
export default function BlogDetailsPage(
  { params }: { params: { slug: string } }
) {
  return <BlogDetailsClient slug={params.slug} />;
}
