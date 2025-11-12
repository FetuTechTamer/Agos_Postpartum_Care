"use client";
import Image from "next/image";
import Link from "next/link";

const Footer = () => {
  return (
    <>
      <footer className="relative z-10 bg-white pt-16 dark:bg-gray-dark md:pt-20 lg:pt-24">
<div className="container">
  <div className="-mx-4 flex flex-wrap">
    {/* Logo/About */}
    <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12">
      <div>
        <Link href="/" className="mb-8 inline-block">
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            className="w-full dark:hidden"
            width={140}
            height={30}
          />
          <Image
            src="/images/logo/logo.png"
            alt="logo"
            className="hidden w-full dark:block"
            width={140}
            height={30}
          />
        </Link>
        <p className="text-base leading-relaxed text-body-color dark:text-body-color-dark">
          Agos Postpartum Care ensures wellness and peace of mind during the crucial 40-day recovery period.
        </p>
      </div>
    </div>

    {/* Useful Links */}
    <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12">
      <div>
        <h2 className="mb-6 text-xl font-bold text-black dark:text-white">
          Useful Links
        </h2>
        <ul>
          <li><Link href="/" className="mb-3 inline-block text-base text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary">Home</Link></li>
          <li><Link href="/about" className="mb-3 inline-block text-base text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary">About</Link></li>
          <li><Link href="/blog" className="mb-3 inline-block text-base text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary">Blog</Link></li>
          <li><Link href="/contact" className="mb-3 inline-block text-base text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary">Contact</Link></li>
          <li><Link href="/services" className="mb-3 inline-block text-base text-body-color hover:text-primary dark:text-body-color-dark dark:hover:text-primary">Services</Link></li>
        </ul>
      </div>
    </div>

    <div className="w-full px-4 sm:w-1/2 md:w-1/2 lg:w-3/12 xl:w-3/12">
      <div className="mb-12 lg:mb-16">
        <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
          Contact Us
        </h2>
        <ul className="space-y-4 text-base text-body-color dark:text-body-color-dark">
          {/* Phone */}
          <li className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 text-primary mr-2"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M6.62 10.79a15.466 15.466 0 006.59 6.59l2.2-2.2a1 1 0 011.05-.24c1.12.37 2.33.57 3.54.57a1 1 0 011 1v3.5a1 1 0 01-1 1C10.07 21 3 13.93 3 5.5a1 1 0 011-1H7.5a1 1 0 011 1c0 1.21.2 2.42.57 3.54a1 1 0 01-.24 1.05l-2.2 2.2z" />
            </svg>
            <div className="flex flex-col">
              <a href="tel:+251967621545" className="hover:text-primary">
                +251 967 621 545
              </a>
              <a href="tel:+251980040468" className="hover:text-primary">
                +251 980 040 468
              </a>
            </div>
          </li>

          {/* Email */}
          <li className="flex items-center">
            <a
              href="mailto:Agospostpartumcare@gmail.com"
              className="hover:text-primary"
            >
              Agospostpartumcare@gmail.com
            </a>
          </li>

        {/* Location */}
        <li className="flex items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-primary mr-2"
            fill="currentColor"
            viewBox="0 0 24 24"
          >
            <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5a2.5 2.5 0 110-5 2.5 2.5 0 010 5z" />
          </svg>
          <a
            href="https://maps.app.goo.gl/mHDvo7CpFwUubWyx6"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-primary"
          >
            Piassa, Lemate Edeget Building
          </a>
        </li>

        </ul>
      </div>
    </div>

    <div className="w-full px-4 md:w-1/2 lg:w-4/12 xl:w-3/12">
      <div className="mb-12 lg:mb-16">
        <h2 className="mb-10 text-xl font-bold text-black dark:text-white">
          Follow Us
        </h2>
        <div className="flex flex-col space-y-4 text-base text-body-color dark:text-body-color-dark">
          {/* Facebook */}
          <a
            href="https://facebook.com/AgospostpartumCare"
            aria-label="Facebook"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M22.675 0h-21.35C.597 0 0 .597 0 1.326v21.348C0 23.403.597 24 1.326 24h11.494v-9.294H9.691V11.01h3.129V8.414c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.796.143v3.24l-1.918.001c-1.504 0-1.796.715-1.796 1.763v2.307h3.587l-.467 3.696h-3.12V24h6.116C23.403 24 24 23.403 24 22.674V1.326C24 .597 23.403 0 22.675 0z"/>
            </svg>
            Facebook
          </a>

          {/* TikTok */}
          <a
            href="https://www.tiktok.com/@Agos_postpartumCare"
            aria-label="TikTok"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 256 256"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M192 0h-42a64 64 0 0 0 64 64V42a42 42 0 0 1-22-6v92a66 66 0 1 1-66-66v42a24 24 0 1 0 24 24V0h42z"/>
            </svg>
            TikTok
          </a>

          {/* Telegram */}
          <a
            href="https://t.me/Agospostpartumcare0"
            aria-label="Telegram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M9.999 15.803 9.97 20.5c.568 0 .814-.244 1.112-.537l2.665-2.565 5.521 4.035c1.012.555 1.732.263 1.985-.935l3.6-16.875c.33-1.522-.547-2.118-1.544-1.751L1.273 9.73c-1.49.583-1.471 1.406-.254 1.783l5.94 1.852L19.17 5.46c.568-.375 1.086-.167.66.208"/>
            </svg>
            Telegram
          </a>

          {/* Instagram */}
          <a
            href="https://instagram.com/agos_postpartumcare"
            aria-label="Instagram"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M7.5 2h9A5.507 5.507 0 0 1 22 7.5v9A5.507 5.507 0 0 1 16.5 22h-9A5.507 5.507 0 0 1 2 16.5v-9A5.507 5.507 0 0 1 7.5 2zm0 2C6.121 4 5 5.121 5 6.5v11C5 18.879 6.121 20 7.5 20h9c1.379 0 2.5-1.121 2.5-2.5v-11C19 5.121 17.879 4 16.5 4h-9zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6zm5.25-2.5a1.25 1.25 0 1 1-2.5 0 1.25 1.25 0 0 1 2.5 0z"/>
            </svg>
            Instagram
          </a>

          {/* WhatsApp */}
          <a
            href="https://wa.me/0967621545"
            aria-label="WhatsApp"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center hover:text-primary duration-300"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="22"
              height="22"
              viewBox="0 0 24 24"
              fill="currentColor"
              className="mr-2"
            >
              <path d="M20.52 3.48A11.946 11.946 0 0 0 12 0C5.373 0 0 5.373 0 12c0 2.115.553 4.163 1.601 5.975L0 24l6.248-1.632A11.944 11.944 0 0 0 12 24c6.627 0 12-5.373 12-12 0-3.191-1.244-6.191-3.48-8.52zM12 21.6c-1.797 0-3.534-.48-5.064-1.392l-.363-.213-3.72.972.994-3.615-.236-.372A9.575 9.575 0 0 1 2.4 12c0-5.302 4.298-9.6 9.6-9.6 2.566 0 4.979 1 6.793 2.814A9.556 9.556 0 0 1 21.6 12c0 5.302-4.298 9.6-9.6 9.6zm5.184-7.248c-.283-.141-1.675-.828-1.935-.922-.26-.094-.45-.141-.64.141-.19.283-.732.922-.896 1.111-.165.19-.331.212-.614.071-.283-.141-1.194-.44-2.273-1.405-.84-.749-1.407-1.673-1.572-1.956-.165-.283-.018-.437.124-.578.127-.127.283-.331.425-.496.141-.165.188-.283.283-.472.094-.19.047-.354-.024-.496-.071-.141-.64-1.536-.878-2.102-.231-.555-.465-.48-.64-.49l-.545-.01c-.189 0-.496.071-.758.354s-.996.973-.996 2.373.996 2.755 1.134 2.947c.141.188 2.004 3.165 4.863 4.436.68.294 1.209.471 1.66.602.697.223 1.33.191 1.83.116.558-.083 1.717-.699 1.958-1.372.241-.674.241-1.248.165-1.372-.07-.124-.26-.2-.543-.342z"/>
            </svg>
            WhatsApp
          </a>
        </div>
      </div>
    </div>

  </div>

  {/* Divider & Copyright */}
  <div className="h-px w-full bg-linear-to-r from-transparent via-[#D2D8E183] to-transparent dark:via-[#959CB183]"></div>
  <div className="py-8">
    <p className="text-center text-base text-body-color dark:text-white">
      © {new Date().getFullYear()} Agos Postpartum Care. All rights reserved.
    </p>
  </div>
</div>

        <div className="absolute right-0 top-14 z-[-1]">
          <svg
            width="55"
            height="99"
            viewBox="0 0 55 99"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle opacity="0.8" cx="49.5" cy="49.5" r="49.5" fill="#959CB1" />
            <mask
              id="mask0_94:899"
              style={{ maskType: "alpha" }}
              maskUnits="userSpaceOnUse"
              x="0"
              y="0"
              width="99"
              height="99"
            >
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="#4A6CF7"
              />
            </mask>
            <g mask="url(#mask0_94:899)">
              <circle
                opacity="0.8"
                cx="49.5"
                cy="49.5"
                r="49.5"
                fill="url(#paint0_radial_94:899)"
              />
              <g opacity="0.8" filter="url(#filter0_f_94:899)">
                <circle cx="53.8676" cy="26.2061" r="20.3824" fill="white" />
              </g>
            </g>
            <defs>
              <filter
                id="filter0_f_94:899"
                x="12.4852"
                y="-15.1763"
                width="82.7646"
                height="82.7646"
                filterUnits="userSpaceOnUse"
                colorInterpolationFilters="sRGB"
              >
                <feFlood floodOpacity="0" result="BackgroundImageFix" />
                <feBlend
                  mode="normal"
                  in="SourceGraphic"
                  in2="BackgroundImageFix"
                  result="shape"
                />
                <feGaussianBlur
                  stdDeviation="10.5"
                  result="effect1_foregroundBlur_94:899"
                />
              </filter>
              <radialGradient
                id="paint0_radial_94:899"
                cx="0"
                cy="0"
                r="1"
                gradientUnits="userSpaceOnUse"
                gradientTransform="translate(49.5 49.5) rotate(90) scale(53.1397)"
              >
                <stop stopOpacity="0.47" />
                <stop offset="1" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-24 left-0 z-[-1]">
          <svg
            width="79"
            height="94"
            viewBox="0 0 79 94"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <rect
              opacity="0.3"
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              fill="url(#paint0_linear_94:889)"
            />
            <rect
              x="-41"
              y="26.9426"
              width="66.6675"
              height="66.6675"
              transform="rotate(-22.9007 -41 26.9426)"
              stroke="url(#paint1_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L77.1885 68.2073L50.5215 7.42229Z"
              fill="url(#paint2_linear_94:889)"
            />
            <path
              d="M50.5215 7.42229L20.325 1.14771L46.2077 62.3249L76.7963 68.2073L50.5215 7.42229Z"
              stroke="url(#paint3_linear_94:889)"
              strokeWidth="0.7"
            />
            <path
              opacity="0.3"
              d="M17.9721 93.3057L-14.9695 88.2076L46.2077 62.325L77.1885 68.2074L17.9721 93.3057Z"
              fill="url(#paint4_linear_94:889)"
            />
            <path
              d="M17.972 93.3057L-14.1852 88.2076L46.2077 62.325L77.1884 68.2074L17.972 93.3057Z"
              stroke="url(#paint5_linear_94:889)"
              strokeWidth="0.7"
            />
            <defs>
              <linearGradient
                id="paint0_linear_94:889"
                x1="-41"
                y1="21.8445"
                x2="36.9671"
                y2="59.8878"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint1_linear_94:889"
                x1="25.6675"
                y1="95.9631"
                x2="-42.9608"
                y2="20.668"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint2_linear_94:889"
                x1="20.325"
                y1="-3.98039"
                x2="90.6248"
                y2="25.1062"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint3_linear_94:889"
                x1="18.3642"
                y1="-1.59742"
                x2="113.9"
                y2="80.6826"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
              <linearGradient
                id="paint4_linear_94:889"
                x1="61.1098"
                y1="62.3249"
                x2="-8.82468"
                y2="58.2156"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0.62" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0" />
              </linearGradient>
              <linearGradient
                id="paint5_linear_94:889"
                x1="65.4236"
                y1="65.0701"
                x2="24.0178"
                y2="41.6598"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor="#4A6CF7" stopOpacity="0" />
                <stop offset="1" stopColor="#4A6CF7" stopOpacity="0.51" />
              </linearGradient>
            </defs>
          </svg>
        </div>
      </footer>
    </>
  );
};

export default Footer;
