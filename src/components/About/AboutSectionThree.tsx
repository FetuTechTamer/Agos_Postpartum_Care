import Image from "next/image";

const AboutSectionThree = () => {
  return (
    <>
<section className="py-20 bg-gradient-to-br from-pink-50 via-white to-rose-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900">
  <div className="container mx-auto px-6 grid grid-cols-1 md:grid-cols-2 gap-12 items-stretch">
    
    {/* Left Column - Quote */}
      <div className="flex items-center">
        <div className="relative w-full h-full bg-white dark:bg-gray-900 rounded-3xl shadow-lg p-10 md:p-14 border border-gray-200 dark:border-gray-700 flex flex-col justify-center overflow-hidden">

          {/* Soft gradient accent */}
          <div className="absolute inset-0 bg-gradient-to-br from-pink-100/40 via-transparent to-primary/10 dark:from-pink-400/10 dark:to-primary/20 pointer-events-none"></div>

          {/* Decorative accent line */}
          <div className="w-20 h-1 bg-primary mb-6 rounded-full"></div>

          {/* Quotation icon */}
          <div className="text-primary/70 text-4xl mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" className="w-8 h-8">
              <path d="M7.17 6A5 5 0 0 0 2 11v7a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-5a5 5 0 0 0-4.83-5zM19.17 6A5 5 0 0 0 14 11v7a3 3 0 0 0 3 3h4a3 3 0 0 0 3-3v-5a5 5 0 0 0-4.83-5z" />
            </svg>
          </div>

          {/* Quote text */}
          <p className="text-xl md:text-2xl leading-relaxed text-gray-800 dark:text-gray-100 font-light">
            “Every mother carries the quiet strength of creation. 
            At <span className="text-primary font-semibold">Agos</span>, we honor that strength — 
            providing calm, care, and compassion for your journey to renewal.”
          </p>

          {/* Footer attribution */}
          <footer className="mt-8 text-primary font-medium text-lg">
            — Agos Postpartum Care
          </footer>
        </div>
      </div>


    {/* Right Column - Full Video */}
    <div className="flex justify-center">
      <div className="w-full h-[400px] md:h-[500px] rounded-3xl overflow-hidden shadow-2xl border border-white/40 dark:border-gray-700">
        <video
          src="/video/agos_vid.MOV"
          controls
          poster="/images/about/job-06.jpg"  // ✅ Add your thumbnail here
          className="w-full h-full object-cover"
        >
          Your browser does not support the video tag.
        </video>
      </div>
    </div>

  </div>
</section>

    <section className="py-16 md:py-20 lg:py-28">
      <div className="container">
        <h2 className="mb-12 text-center text-3xl font-bold text-black dark:text-white">
          Meet Our Caring Team
        </h2>
        <div className="-mx-4 flex flex-wrap items-center">
          
          {/* Team Member 1 - Decor */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-01.jpg"
                  alt="Welcome Surprise Decor"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Welcome Surprise Decor</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                Thoughtful surprise decorations to celebrate and uplift the mother’s postpartum journey with warmth and joy.
              </p>
            </div>
          </div>

          {/* Team Member 2 - Nanny */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-02.jpg"
                  alt="Certified Nanny"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Certified Nanny</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                A well-trained professional who provides attentive childcare support, giving mothers peace of mind and time to rest.
              </p>
            </div>
          </div>

          {/* Team Member 3 - Chef */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-03.jpg"
                  alt="Personal Chef"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Personal Chef</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                Prepares healthy meals designed by the nutritionist: breakfast, lunch, dinner, juices, and Atmit exclusively for the mother — plus Genfo for guests.
              </p>
            </div>
          </div>

          {/* Team Member 4 - Massager */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-04.jpg"
                  alt="Professional Massager"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Professional Massager</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                Provides whole body massages, facial care, and body treatments with natural mixtures once a week (4 times a month).
              </p>
            </div>
          </div>

          {/* Team Member 5 - Nutritionist */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-05.jpg"
                  alt="Certified Nutritionist"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Certified Nutritionist</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                Designs and oversees customized meal plans to ensure the mother’s recovery, strength, and nourishment are fully supported during the postpartum period.
              </p>
            </div>
          </div>

          {/* Team Member 6 - Nurse */}
          <div className="w-full px-4 lg:w-1/3 mb-8">
            <div className="text-center">
              <div className="relative mb-4 aspect-[4/5] max-w-[220px] mx-auto">
                <Image
                  src="/images/about/job-06.jpg"
                  alt="Nurse"
                  fill
                  className="rounded-lg object-cover drop-shadow-lg"
                />
              </div>
              <h3 className="text-xl font-bold text-black dark:text-white">Nurse</h3>
              <p className="mt-2 text-sm text-body-color dark:text-gray-400">
                Offers health check-ups for both mother and baby, along with counseling and mental health support during recovery.
              </p>
            </div>
          </div>

        </div>
      </div>
    </section>



      {/* Call to Action Section */}
      <section className="py-16 md:py-20 lg:py-28 bg-gray-100 dark:bg-gray-800 text-center">
        <div className="container">
          {/* Heading */}
          <h2 className="mb-6 text-3xl font-bold text-black dark:text-white">
            Ready to Start Your Journey?
          </h2>

          {/* Subtext */}
          <p className="mb-4 text-lg text-body-color dark:text-gray-300 max-w-2xl mx-auto">
            Your postpartum care experience starts here. Reach out to us directly 
            to book your package, receive full service details, or ask any 
            questions you may have.  
          </p>
          <p className="mb-10 text-base text-body-color dark:text-gray-400">
            Choose one of the Telegram options below to connect instantly with our team:
          </p>

          {/* Buttons */}
          <div className="flex flex-col sm:flex-row justify-center gap-6">
            {/* Telegram Option 1 */}
            <a
              href="https://t.me/Agospostpartumcare"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 text-base font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-primary/90 hover:shadow-lg"
            >
              {/* Telegram SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.999 15.17 9.94 20a.71.71 0 0 0 .58-.28l2.77-3.34 5.74 4.18c1.05.58 1.8.28 2.07-.98l3.75-17.6c.38-1.74-.63-2.42-1.72-2.02L.64 9.64c-1.69.66-1.67 1.6-.3 2.02l5.75 1.8L18.79 5.21c.54-.36 1.02-.16.62.2" />
              </svg>
              <span>@Agospostpartumcare</span>
            </a>

            {/* Telegram Option 2 */}
            <a
              href="https://t.me/Agospostpartumcare0"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-base font-semibold text-white shadow-md transition duration-300 ease-in-out hover:bg-black/90 dark:bg-white/10 dark:text-white dark:hover:bg-white/5 hover:shadow-lg"
            >
              {/* Telegram SVG Icon */}
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="18"
                height="18"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M9.999 15.17 9.94 20a.71.71 0 0 0 .58-.28l2.77-3.34 5.74 4.18c1.05.58 1.8.28 2.07-.98l3.75-17.6c.38-1.74-.63-2.42-1.72-2.02L.64 9.64c-1.69.66-1.67 1.6-.3 2.02l5.75 1.8L18.79 5.21c.54-.36 1.02-.16.62.2" />
              </svg>
              <span>@Agospostpartumcare0</span>
            </a>
          </div>
        </div>
      </section>

    </>
  );
};

export default AboutSectionThree;