"use client";

import { useEffect, useState } from "react";
import SingleBlog from "@/components/Blog/SingleBlog";

const Blog = () => {
  const [blogs, setBlogs] = useState<any[]>([]);

  useEffect(() => {
       fetch("http://localhost/Agos_Postpartum_Care/api/getBlogs.php")
      .then((res) => res.json())
      .then((data) => setBlogs(data));
  }, []);

  return (
    <section className="pt-[120px] pb-[120px]">
      <div className="container flex flex-wrap justify-center gap-6">
        {Array.isArray(blogs) && blogs.map((blog) => (
          <div key={blog.id}>
            <SingleBlog blog={blog} />
          </div>
        ))}

      </div>
    </section>
  );
};

export default Blog;
