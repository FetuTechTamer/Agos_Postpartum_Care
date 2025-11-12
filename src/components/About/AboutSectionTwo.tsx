import Image from "next/image";

const AboutSectionTwo = () => {
  return (
<section className="py-16 md:py-20 lg:py-28">
  <div className="container">
    <div className="-mx-4 flex flex-wrap items-center">
      <div className="w-full px-4 lg:w-1/2">
        <div
          className="relative mx-auto mb-12 aspect-25/24 max-w-[500px] text-center lg:m-0"
          data-wow-delay=".15s"
        >
          <Image
            src="/images/about/about-image-2.png
            "
            alt="vision image"
            fill
            className="drop-shadow-three dark:hidden dark:drop-shadow-none"
          />
          <Image
            src="/images/about/about-image-2.png
            "
            alt="vision image"
            fill
            className="hidden drop-shadow-three dark:block dark:drop-shadow-none"
          />
        </div>
      </div>
      <div className="w-full px-4 lg:w-1/2">
        <div className="max-w-[470px]">
          <div className="mb-9">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Our Vision
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
              We aspire to create a world where every new mother feels supported and empowered during her postpartum journey, fostering a community of care and understanding.
            </p>
          </div>
          <div className="mb-9">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Commitment to Quality
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
              We are dedicated to providing exceptional services that cater to the unique needs of new mothers, ensuring a nurturing environment for both mother and child.
            </p>
          </div>
          <div className="mb-1">
            <h3 className="mb-4 text-xl font-bold text-black dark:text-white sm:text-2xl lg:text-xl xl:text-2xl">
              Holistic Approach
            </h3>
            <p className="text-base font-medium leading-relaxed text-body-color sm:text-lg sm:leading-relaxed">
              Our vision encompasses a holistic approach to postpartum care, integrating emotional, physical, and nutritional support for a well-rounded recovery.
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>
  );
};

export default AboutSectionTwo;
