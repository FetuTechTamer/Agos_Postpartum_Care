"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import SingleBlog from "@/components/Blog/SingleBlog";
import Breadcrumb from "@/components/Common/Breadcrumb";

const BlogPageClient = () => {
  const [blogs, setBlogs] = useState<any[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const maxVisiblePages = 4;

  const fetchBlogs = async (page: number) => {
    setLoading(true);
    try {
      const res = await fetch(
        `http://localhost/Agos_Postpartum_Care/api/getBlogs.php?page=${page}`
      );
      const data = await res.json();

      // Ensure each blog has fallback images and data
      const safeBlogs = Array.isArray(data.blogs)
        ? data.blogs.map((blog: any) => ({
            ...blog,
            blog_image:
              blog.blog_image && blog.blog_image.trim() !== ""
                ? blog.blog_image
                : "/images/default-blog-image.jpg",
            author: {
              ...blog.author,
              image:
                blog.author?.image && blog.author.image.trim() !== ""
                  ? blog.author.image
                  : "/images/default-author.jpg",
              name: blog.author?.name || "Unknown Author",
              designation: blog.author?.designation || "",
            },
            title: blog.title || "Untitled Blog",
            tag: Array.isArray(blog.tag) ? blog.tag : blog.tag || [],
            published_date: blog.published_date || "N/A",
          }))
        : [];

      setBlogs(safeBlogs);
      setCurrentPage(data.currentPage || 1);
      setTotalPages(data.totalPages || 1);
    } catch (err) {
      console.error("Failed to fetch blogs:", err);
      setBlogs([]);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchBlogs(currentPage);
  }, [currentPage]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      setCurrentPage(page);
    }
  };

  const renderPagination = () => {
    const pages = [];
    const startPage = Math.max(
      1,
      Math.min(currentPage, totalPages - maxVisiblePages + 1)
    );
    const endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <li key={i} className="mx-1">
          <button
            onClick={() => goToPage(i)}
            className={`flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm transition 
              ${
                i === currentPage
                  ? "bg-primary text-white"
                  : "bg-body-color/15 text-body-color hover:bg-primary hover:text-white"
              }`}
          >
            {i}
          </button>
        </li>
      );
    }
    return pages;
  };

  return (
    <>
      <Breadcrumb
        pageName="Blog Grid"
        description="Discover a wealth of insights, tips, and inspiring stories tailored for new mothers. Our blog offers valuable resources on postpartum care, wellness strategies, and emotional support."
      />
      <section className="pt-[120px] pb-[120px]">
        <div className="container">
          {loading ? (
            <p className="text-center text-lg text-gray-500">Loading blogs...</p>
          ) : blogs.length === 0 ? (
            <p className="text-center text-lg text-gray-500">No blogs found.</p>
          ) : (
            <div className="-mx-4 flex flex-wrap justify-center">
              {blogs.map((blog) => (
                <div
                  key={blog.id}
                  className="w-full px-4 md:w-2/3 lg:w-1/2 xl:w-1/3"
                >
                  <Link href={`/blog/${blog.slug}`}>
                    <SingleBlog blog={blog} />
                  </Link>
                </div>
              ))}
            </div>
          )}

          {/* Pagination */}
          <div className="-mx-4 flex flex-wrap mt-8">
            <div className="w-full px-4">
              <ul className="flex items-center justify-center">
                <li className="mx-1">
                  <button
                    onClick={() => goToPage(currentPage - 1)}
                    disabled={currentPage === 1 || loading}
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm bg-body-color/15 text-body-color disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition"
                  >
                    Prev
                  </button>
                </li>

                {renderPagination()}

                <li className="mx-1">
                  <button
                    onClick={() => goToPage(currentPage + 1)}
                    disabled={currentPage === totalPages || loading}
                    className="flex h-9 min-w-[36px] items-center justify-center rounded-md px-4 text-sm bg-body-color/15 text-body-color disabled:opacity-50 disabled:cursor-not-allowed hover:bg-primary hover:text-white transition"
                  >
                    Next
                  </button>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BlogPageClient;
