"use client";

import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const SharePost = () => {
  const pathname = usePathname();
  const [currentUrl, setCurrentUrl] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setCurrentUrl(window.location.origin + pathname);
    }
  }, [pathname]);

  if (!currentUrl) {
    // 🔹 Avoid hydration mismatch by rendering nothing until URL is ready
    return null;
  }

  return (
    <div className="flex items-center">
      {/* Facebook */}
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on Facebook"
        className="mb-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary sm:ml-3"
      >
        <svg width="18" height="18" viewBox="0 0 22 22" className="fill-current">
          <path d="M12.1 10.4939V7.42705C12.1 6.23984 13.085 5.27741 14.3 5.27741H16.5V2.05296L13.5135 1.84452C10.9664 1.66676 8.8 3.63781 8.8 6.13287V10.4939H5.5V13.7183H8.8V20.1667H12.1V13.7183H15.4L16.5 10.4939H12.1Z" />
        </svg>
      </a>
      {/* LinkedIn */}
      <a
        href={`https://www.linkedin.com/shareArticle?mini=true&url=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on LinkedIn"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
      >
        <svg width="18" height="18" viewBox="0 0 16 16" className="fill-current">
          <path d="M14.3442 0H1.12455C0.499798 0 0 0.497491 0 1.11936V14.3029C0 14.8999 0.499798 15.4222 1.12455 15.4222H14.2942C14.919 15.4222 15.4188 14.9247 15.4188 14.3029V1.09448C15.4688 0.497491 14.969 0 14.3442 0ZM4.57316 13.1089H2.29907V5.7709H4.57316V13.1089ZM3.42362 4.75104C2.67392 4.75104 2.09915 4.15405 2.09915 3.43269C2.09915 2.71133 2.69891 2.11434 3.42362 2.11434C4.14833 2.11434 4.74809 2.71133 4.74809 3.43269C4.74809 4.15405 4.19831 4.75104 3.42362 4.75104ZM13.1947 13.1089H10.9206V9.55183C10.9206 8.7061 10.8956 7.58674 9.72108 7.58674C8.52156 7.58674 8.34663 8.53198 8.34663 9.47721V13.1089H6.07255V5.7709H8.29665V6.79076H8.32164C8.64651 6.19377 9.37122 5.59678 10.4958 5.59678C12.8198 5.59678 13.2447 7.08925 13.2447 9.12897V13.1089H13.1947Z" />
        </svg>
      </a>
      {/* WhatsApp */}
      <a
        href={`https://wa.me/?text=${encodeURIComponent(currentUrl)}`}
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Share on WhatsApp"
        className="mb-3 ml-3 inline-flex h-9 w-9 items-center justify-center rounded-xs bg-gray-light text-body-color duration-300 hover:bg-primary hover:text-white dark:bg-gray-dark dark:hover:bg-primary"
      >
        <svg width="20" height="20" viewBox="0 0 32 32" className="fill-current">
          <path d="M16.027 3C9.396 3 4 8.396 4 15.027c0 2.646.844 5.086 2.275 7.1L4 29l7.09-2.248A11.93 11.93 0 0 0 16.027 27C22.658 27 28 21.604 28 14.973S22.658 3 16.027 3zm0 21.83a9.89 9.89 0 0 1-5.033-1.365l-.361-.215-4.203 1.327 1.368-4.094-.235-.375A9.84 9.84 0 0 1 6.14 15.03c0-5.437 4.424-9.861 9.861-9.861 5.437 0 9.861 4.424 9.861 9.861 0 5.438-4.424 9.862-9.861 9.862zm5.598-7.421c-.306-.153-1.809-.89-2.09-.992-.28-.102-.484-.153-.688.153-.204.306-.79.991-.967 1.195-.178.204-.357.229-.663.077-.306-.153-1.29-.475-2.456-1.514-.907-.808-1.52-1.809-1.698-2.115-.178-.306-.019-.47.134-.622.137-.137.306-.357.459-.535.153-.178.204-.306.306-.51.102-.204.051-.383-.025-.536-.076-.153-.688-1.664-.94-2.275-.247-.594-.498-.513-.688-.522l-.585-.01c-.204 0-.536.077-.817.383s-1.072 1.047-1.072 2.555 1.097 2.962 1.249 3.168c.153.204 2.16 3.293 5.233 4.62.732.316 1.303.505 1.749.647.735.234 1.404.202 1.933.122.59-.088 1.809-.739 2.063-1.452.255-.714.255-1.326.178-1.452-.076-.127-.28-.204-.585-.357z" />
        </svg>
      </a>
    </div>
  );
};

export default SharePost;
