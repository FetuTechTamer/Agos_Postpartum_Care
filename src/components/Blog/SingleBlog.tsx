"use client";

import Link from "next/link";
import Image from "next/image";

const SingleBlog = ({ blog }: any) => {
  const { title, content, blog_image, author, tag, published_date, slug } = blog;

  const truncateText = (text: string, maxLength: number) => {
    if (!text) return "";
    return text.length > maxLength ? text.substring(0, maxLength) + "..." : text;
  };

  // Blog image fallback
  const blogImg =
    blog_image && blog_image.trim() !== ""
      ? `/${blog_image.replace(/^\/?/, "")}`
      : "/images/default-blog-image.jpg";

  // Author image fallback
  const authorImg =
    author?.image && author.image.trim() !== ""
      ? `/${author.image.replace(/^\/?/, "")}`
      : "/images/default-author.jpg";

  return (
    <div className="mb-10 w-full">
      <div className="overflow-hidden rounded-2xl shadow-md">
        <Image
          src={blogImg}
          alt={title || "Blog Image"}
          width={600}
          height={400}
          className="w-full h-64 object-cover"
        />

        <div className="p-5">
          {/* Date + Tag */}
          <div className="flex items-center gap-3 mb-3 text-sm text-gray-500">
            <span>{published_date || "N/A"}</span>
            <span>•</span>
            <span>{Array.isArray(tag) ? tag.join(", ") : tag || "No tags"}</span>
          </div>

          {/* Blog Title */}
          <h3 className="text-xl font-semibold mb-3">{title || "Untitled Blog"}</h3>

          {/* Blog Content */}
          {content && (
            <p className="text-gray-600">{truncateText(content, 250)}</p> // limit to 250 chars
          )}

          {/* Author Info */}
          {author && (
            <div className="flex items-center mt-4">
              {authorImg && (
                <Image
                  src={authorImg}
                  alt={author.name || "Author"}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
              )}
              <div className="ml-3">
                <p className="text-sm font-medium">{author.name || "Unknown Author"}</p>
                <p className="text-xs text-gray-500">{author.designation || ""}</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};


export default SingleBlog;
