import SectionTitle from "../Common/SectionTitle";
import SingleFeature from "./SingleFeature";
import featuresData from "./featuresData";

const Index = () => {
  return (
    <section id="features" className="relative py-16 md:py-20 lg:py-28">
      
      {/* Top-left angled decorative ribbon SVG */}
      <div className="absolute left-0 top-0 z-[-1] opacity-30 lg:opacity-100 -rotate-12">
        <svg
          width="420"
          height="220"
          viewBox="0 0 420 220"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M0 180C80 150 160 200 240 170C320 140 380 180 420 150"
            stroke="url(#ribbonGradTop)"
            strokeWidth="3"
            fill="none"
            opacity="0.8"
          />
          <path
            d="M0 200C90 170 150 210 240 190C330 170 360 200 420 180"
            stroke="url(#ribbonGradTop)"
            strokeWidth="2"
            fill="none"
            opacity="0.5"
          />
          <circle cx="100" cy="150" r="30" fill="url(#cGlow1Top)" />
          <circle cx="140" cy="170" r="20" fill="url(#cGlow2Top)" />
          <circle cx="190" cy="160" r="15" fill="url(#cGlow2Top)" />
          <defs>
            <linearGradient id="ribbonGradTop" x1="0" y1="150" x2="420" y2="200" gradientUnits="userSpaceOnUse">
              <stop stopColor="#22b3c1" />
              <stop offset="1" stopColor="#22b3c1" stopOpacity="0" />
            </linearGradient>
            <radialGradient id="cGlow1Top" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(100 150) rotate(90) scale(30)">
              <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
              <stop offset="1" stopColor="#22b3c1" stopOpacity="0.1" />
            </radialGradient>
            <radialGradient id="cGlow2Top" cx="0" cy="0" r="1" gradientUnits="userSpaceOnUse"
              gradientTransform="translate(140 170) rotate(90) scale(20)">
              <stop offset="0.1" stopColor="#22b3c1" stopOpacity="0" />
              <stop offset="1" stopColor="#22b3c1" stopOpacity="0.08" />
            </radialGradient>
          </defs>
        </svg>
      </div>

      <div className="container relative z-10">
        <SectionTitle
          title="Our Services"
          paragraph="At Agos Postpartum Care, we celebrate the beautiful journey of motherhood by offering tailored support for new mothers. From holistic health diagnostics to nurturing childcare assistance."
          center
        />

        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3">
          {featuresData.map((feature) => (
            <SingleFeature key={feature.id} feature={feature} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Index;
