import { Feature } from "@/types/feature";

const SingleFeature = ({ feature }: { feature: Feature }) => {
  const { image, title, paragraph } = feature;

  return (
    <div className="w-full">
      <div className="wow fadeInUp" data-wow-delay=".15s">
        {/* Image */}
        <div className="mb-6 overflow-hidden rounded-lg shadow-md">
          <img
            src={image}
            alt={title}
            className="w-full h-48 object-cover sm:h-56 md:h-60 lg:h-64"
          />
        </div>

        {/* Title */}
        <h3 className="mb-4 text-xl font-bold text-black sm:text-2xl lg:text-xl xl:text-2xl dark:text-white">
          {title}
        </h3>

        {/* Paragraph */}
        <p className="text-body-color text-base leading-relaxed font-medium">
          {paragraph}
        </p>
      </div>
    </div>
  );
};

export default SingleFeature;
