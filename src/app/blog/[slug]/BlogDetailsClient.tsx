// app/blog/[slug]/BlogDetailsClient.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import RelatedPost from "@/components/Blog/RelatedPost";
import SharePost from "@/components/Blog/SharePost";
import TagButton from "@/components/Blog/TagButton";
import NewsLatterBox from "@/components/Contact/NewsLatterBox";

const BlogDetailsClient = () => {
  const { slug } = useParams();
  const [blog, setBlog] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [popularTags, setPopularTags] = useState<string[]>([]);
  const [relatedPosts, setRelatedPosts] = useState<any[]>([]);

  // Fetch blog details
  useEffect(() => {
    if (slug) {
      setLoading(true);
      fetch(
        `http://localhost/Agos_Postpartum_Care/api/getBlogDetail.php?slug=${slug}`
      )
        .then((res) => res.json())
        .then((data) => {
          setBlog(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error fetching blog:", err);
          setLoading(false);
        });
    }
  }, [slug]);

  // Fetch latest 3 tags
  useEffect(() => {
    fetch("http://localhost/Agos_Postpartum_Care/api/getLatestTags.php")
      .then((res) => res.json())
      .then((data) => setPopularTags(data))
      .catch((err) => console.error("Error fetching tags:", err));
  }, []);

  // Fetch related posts
  useEffect(() => {
    fetch("http://localhost/Agos_Postpartum_Care/api/getLatestPosts.php")
      .then((res) => res.json())
      .then((data) => setRelatedPosts(data))
      .catch((err) => console.error("Error fetching related posts:", err));
  }, []);

  if (loading) return <p className="text-center py-20">Loading...</p>;
  if (!blog || blog.error) return <p className="text-center py-20">Blog not found</p>;

  const { detail } = blog;

  return (
    <section className="pt-[150px] pb-[120px]">
      <div className="container">
        <div className="-mx-4 flex flex-wrap justify-center">
          {/* Main Blog Content */}
          <div className="w-full px-4 lg:w-8/12">
            <h2 className="mb-8 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl">
              {blog.title}
            </h2>

            {/* Author Info */}
            <div className="mb-10 flex flex-wrap items-center justify-between border-b border-body-color/10 pb-4 dark:border-white/10">
              <div className="flex flex-wrap items-center">
                <div className="mr-10 mb-5 flex items-center">
                  {blog.author?.image && (
                    <div className="relative mr-4 h-10 w-10 overflow-hidden rounded-full">
                      <Image src={blog.author.image} alt={blog.author.name} fill />
                    </div>
                  )}
                  <div>
                    <span className="text-base font-medium text-body-color">
                      By <span>{blog.author?.name}</span>
                    </span>
                  </div>
                </div>
                <div className="mb-5 flex items-center gap-5">
                  <p className="flex items-center text-base font-medium text-body-color">
                    <span className="mr-3">🗓</span>
                    {blog.published_date}
                  </p>
                </div>
              </div>
              {blog.tag && (
                <span className="mb-5 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white">
                  {blog.tag}
                </span>
              )}
            </div>

            {/* Blog Content */}
            <div>
              {detail?.content1 && (
                <p className="mb-10 text-base font-medium leading-relaxed text-body-color sm:text-lg">
                  {detail.content1}
                </p>
              )}

              {detail?.detail_image && (
                <div className="mb-10 w-full overflow-hidden rounded-sm">
                  <div className="relative aspect-97/60 w-full sm:aspect-97/44">
                    <Image
                      src={detail.detail_image || "/images/default-blog-image.jpg"}
                      alt={blog.title}
                      fill
                      className="object-cover object-center"
                    />
                  </div>
                </div>
              )}

              {detail?.content2 && (
                <p className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg">
                  {detail.content2}
                </p>
              )}

              {detail?.quote && (
                <div className="relative z-10 mb-10 overflow-hidden rounded-md bg-primary/10 p-8">
                  <p className="text-center text-base font-medium italic text-body-color">
                    {detail.quote}
                  </p>
                </div>
              )}

              {detail?.summary && (
                
                <div className="mb-8 text-base font-medium leading-relaxed text-body-color sm:text-lg">{detail.summary}</div>
              )}

              {/* Extra Tags */}
              <div className="mb-10 flex gap-2">
                {[detail?.additional_tag1, detail?.additional_tag2, detail?.additional_tag3]
                  .filter(Boolean)
                  .map((tag, i) => (
                    <TagButton key={i} text={tag} />
                  ))}
              </div>

              <div className="mb-5">
                <h5 className="mb-3 text-sm font-medium text-body-color sm:text-right">
                  Share this post:
                </h5>
                <div className="flex items-center sm:justify-end">
                  <SharePost />
                </div>
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="w-full px-4 lg:w-4/12">
            {/* Related Posts */}
            <div className="mb-10 rounded-xs bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
              <h3 className="border-b border-body-color/10 px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Related Posts
              </h3>
              <ul className="p-8">
                {relatedPosts.length > 0 ? (
                  relatedPosts.map((post) => (
                    <li
                      key={post.id}
                      className="mb-6 border-b border-body-color/10 pb-6 dark:border-white/10"
                    >
                      <RelatedPost
                        title={post.title}
                        image={post.blog_image || "/images/default-blog-image.jpg"}
                        slug={`/blog/${post.slug}`}
                        date={post.published_date}
                      />
                    </li>
                  ))
                ) : (
                  <p className="text-sm text-body-color">No related posts found</p>
                )}
              </ul>
            </div>

            {/* Quick Actions */}
            <div className="mb-10 rounded-xs bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
              <h3 className="border-b border-body-color/10 px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Quick Actions
              </h3>
              <ul className="px-8 py-6">
                <li>
                  <a
                    href="../book"
                    className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    Book Now
                  </a>
                </li>
                <li>
                  <a
                    href="../contact"
                    className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    Contact Us
                  </a>
                </li>
                <li>
                  <a
                    href="https://t.me/Agospostpartumcare0"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    Reach Out on Telegram
                  </a>
                </li>
                <li>
                  <a
                    href="https://www.tiktok.com/@Agos_postpartumCare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mb-3 inline-block text-base font-medium text-body-color hover:text-primary"
                  >
                    Previous Works on TikTok
                  </a>
                </li>
              </ul>
            </div>

            {/* Popular Tags */}
            <div className="mb-10 rounded-xs bg-white shadow-three dark:bg-gray-dark dark:shadow-none">
              <h3 className="border-b border-body-color/10 px-8 py-4 text-lg font-semibold text-black dark:border-white/10 dark:text-white">
                Popular Tags
              </h3>
              <div className="flex flex-wrap px-8 py-6">
                {popularTags.length > 0 ? (
                  popularTags.map((tag, i) => (
                    <a
                      key={i}
                      href="/blog"
                      className="mr-2 mb-2 inline-flex items-center justify-center rounded-full bg-primary px-4 py-2 text-sm font-semibold text-white transition hover:bg-primary/80"
                    >
                      {tag}
                    </a>
                  ))
                ) : (
                  <p className="text-sm text-body-color">No tags found</p>
                )}
              </div>
            </div>

            <NewsLatterBox />
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogDetailsClient;
