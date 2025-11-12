import Link from "next/link";

const Hero = () => {
  return (
    <>
      <section
        id="home"
        className="relative z-10 overflow-hidden bg-white pb-16 pt-[120px] dark:bg-gray-dark md:pb-[120px] md:pt-[150px] xl:pb-[160px] xl:pt-[180px] 2xl:pb-[200px] 2xl:pt-[210px]"
      >
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="mx-auto max-w-[800px] text-center">
                  <h1 className="mb-5 text-3xl font-bold leading-tight text-black dark:text-white sm:text-4xl sm:leading-tight md:text-5xl md:leading-tight">
                    Agos Postpartum Care
                  </h1>
                  <p className="mb-12 text-base leading-relaxed text-body-color dark:text-body-color-dark sm:text-lg md:text-xl">
                    Nurturing mothers, empowering families. At <span className="font-semibold text-primary">Agos Postpartum Care</span>, we walk beside you through the precious 40-day journey after birth. From health checkups and emotional support to newborn care, nourishing meals, and soothing massage therapy — everything we do is designed to restore your strength, uplift your spirit, and help you embrace motherhood with confidence and joy.
                  </p>
              </div>
            </div>
          </div>
        </div>
        <div className="absolute left-0 top-0 z-[-1] opacity-30 lg:opacity-60">
          <svg
            width="480"
            height="560"
            viewBox="0 0 480 560"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="200" cy="120" r="180" fill="url(#grad0)" />
            <circle cx="380" cy="220" r="30" fill="url(#grad1)" />
            <circle cx="100" cy="300" r="50" fill="url(#grad2)" />
            <circle
              opacity="0.7"
              cx="260"
              cy="320"
              r="160"
              transform="rotate(25 260 320)"
              fill="url(#grad3)"
            />
            <circle
              opacity="0.8"
              cx="150"
              cy="360"
              r="120"
              transform="rotate(-40 150 360)"
              stroke="url(#grad4)"
            />
            <circle
              opacity="0.6"
              cx="360"
              cy="280"
              r="190"
              transform="rotate(12 360 280)"
              stroke="url(#grad5)"
            />
            <defs>
              <linearGradient id="grad0" x1="50" y1="0" x2="200" y2="260" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="grad1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(380 220) rotate(90) scale(30)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient id="grad2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(100 300) rotate(90) scale(50)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient id="grad3" x1="150" y1="50" x2="280" y2="360" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad4" x1="150" y1="220" x2="150" y2="480" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad5" x1="360" y1="120" x2="360" y2="440" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute right-0 top-10 z-[-1] opacity-25 lg:opacity-50">
          <svg
            width="420"
            height="500"
            viewBox="0 0 420 500"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="220" cy="100" r="160" fill="url(#grad6)" />
            <circle cx="50" cy="180" r="25" fill="url(#grad7)" />
            <circle cx="300" cy="300" r="40" fill="url(#grad8)" />
            <circle
              opacity="0.6"
              cx="180"
              cy="320"
              r="140"
              transform="rotate(-20 180 320)"
              fill="url(#grad9)"
            />
            <circle
              opacity="0.7"
              cx="280"
              cy="360"
              r="100"
              transform="rotate(30 280 360)"
              stroke="url(#grad10)"
            />
            <circle
              opacity="0.5"
              cx="100"
              cy="280"
              r="170"
              transform="rotate(-10 100 280)"
              stroke="url(#grad11)"
            />
            <defs>
              <linearGradient id="grad6" x1="0" y1="0" x2="220" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="#80d9e6" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="grad7" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(50 180) rotate(90) scale(25)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
              </radialGradient>
              <radialGradient id="grad8" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(300 300) rotate(90) scale(40)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
              </radialGradient>
              <linearGradient id="grad9" x1="50" y1="50" x2="180" y2="320" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="#80d9e6" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad10" x1="180" y1="220" x2="180" y2="480" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
              <linearGradient id="grad11" x1="100" y1="120" x2="100" y2="440" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="white" stopOpacity="0" />
              </linearGradient>
            </defs>
          </svg>
        </div>
        <div className="absolute bottom-0 right-0 z-[-1] opacity-30 lg:opacity-100">
          <svg
            width="420"
            height="220"
            viewBox="0 0 420 220"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M0 180C80 150 160 200 240 170C320 140 380 180 420 150"
              stroke="url(#ribbonGrad)"
              strokeWidth="3"
              fill="none"
              opacity="0.8"
            />
            <path
              d="M0 200C90 170 150 210 240 190C330 170 360 200 420 180"
              stroke="url(#ribbonGrad)"
              strokeWidth="2"
              fill="none"
              opacity="0.5"
            />
            <circle cx="100" cy="150" r="30" fill="url(#cGlow1)" />
            <circle cx="140" cy="170" r="20" fill="url(#cGlow2)" />
            <circle cx="190" cy="160" r="15" fill="url(#cGlow2)" />
            <defs>
              <linearGradient id="ribbonGrad" x1="0" y1="150" x2="420" y2="200" gradientUnits="userSpaceOnUse">
                <stop stopColor="#22b3c1" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0" />
              </linearGradient>
              <radialGradient id="cGlow1" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(100 150) rotate(90) scale(30)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.1" />
              </radialGradient>
              <radialGradient id="cGlow2" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
                gradientTransform="translate(140 170) rotate(90) scale(20)">
                <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
                <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
              </radialGradient>
            </defs>
          </svg>
        </div>


      </section>
    </>
  );
};

export default Hero;
