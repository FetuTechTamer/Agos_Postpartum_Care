// RelatedPost.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

const RelatedPost = ({ image, slug, title, date }: { image: string; slug: string; title: string; date: string; }) => {
   const imgSrc = image?.trim() ? image : "/images/default-blog-image.jpg";

  return (
    <div className="flex items-center lg:block xl:flex">
      <div className="mr-5 lg:mb-3 xl:mb-0">
        <div className="relative h-[60px] w-[70px] overflow-hidden rounded-md sm:h-[75px] sm:w-[85px]">
          {imgSrc && <Image src={imgSrc} alt={title || "Related Post"} fill />}
        </div>
      </div>
      <div className="w-full">
        <h5>
          <Link
            href={slug || "#"}
            className="mb-[6px] block text-base font-medium leading-snug text-black hover:text-primary dark:text-white dark:hover:text-primary"
          >
            {title || "Untitled"}
          </Link>
        </h5>
        <p className="text-xs font-medium text-body-color">{date || "Unknown Date"}</p>
      </div>
    </div>
  );
};

export default RelatedPost;
