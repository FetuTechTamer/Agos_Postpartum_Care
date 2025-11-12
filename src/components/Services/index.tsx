import Image from "next/image";
import SectionTitle from "@/components/Common/SectionTitle";
import List from "@/components/Common/List";

const Services = () => {
  return (
    <section className="py-16 md:py-20 lg:py-28">
      <div className="container space-y-24">
        
        {/* Service 1: Welcome Surprise Decor */}
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Welcome Surprise Decor"
              paragraph="Thoughtful decorations that celebrate and uplift the mother’s postpartum journey, creating a warm and joyful environment."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Customized room decoration" />
                <List text="Celebratory atmosphere" />
                <List text="Personalized touches for the mother" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Positive emotional support" />
                <List text="Relaxing postpartum ambiance" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
              <Image
                src="/images/about/job-01.jpg"
                alt="Welcome Surprise Decor"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Service 2: Certified Nanny */}
        <div className="-mx-4 flex flex-wrap items-center lg:flex-row-reverse">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Certified Nanny"
              paragraph="A trained childcare professional who ensures that your baby is cared for with love and expertise, allowing mothers to rest and recover."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Experienced with newborn care" />
                <List text="Safe and attentive supervision" />
                <List text="Assistance with daily baby routines" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Support for the mother’s rest" />
                <List text="Peace of mind for families" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:ml-0">
              <Image
                src="/images/about/job-02.jpg"
                alt="Certified Nanny"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Service 3: Personal Chef */}
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Personal Chef"
              paragraph="Nutritious and delicious meals prepared daily, designed by our certified nutritionist to help mothers recover and stay energized."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Breakfast, lunch, and dinner" />
                <List text="Healthy juices & Atmit for mothers" />
                <List text="Traditional Genfo for guests" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Tailored nutrition plans" />
                <List text="Hygienic preparation" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
              <Image
                src="/images/about/job-03.jpg"
                alt="Personal Chef"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Service 4: Professional Massager */}
        <div className="-mx-4 flex flex-wrap items-center lg:flex-row-reverse">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Professional Massager"
              paragraph="Relaxation and healing through massage therapy designed for postpartum recovery, easing stress and restoring balance."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Whole-body massage" />
                <List text="Facial treatments" />
                <List text="Body scrubs with natural mixtures" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Weekly sessions (4x/month)" />
                <List text="Stress & tension relief" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:ml-0">
              <Image
                src="/images/about/job-04.jpg"
                alt="Professional Massager"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Service 5: Certified Nutritionist */}
        <div className="-mx-4 flex flex-wrap items-center">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Certified Nutritionist"
              paragraph="Personalized meal plans and guidance to ensure complete nourishment, helping mothers regain strength and vitality."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Tailored postpartum meal plans" />
                <List text="Boosts recovery and immunity" />
                <List text="Supports breastfeeding mothers" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Balanced diet approach" />
                <List text="Ongoing nutritional monitoring" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:mr-0">
              <Image
                src="/images/about/job-05.jpg"
                alt="Certified Nutritionist"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

        {/* Service 6: Nurse */}
        <div className="-mx-4 flex flex-wrap items-center lg:flex-row-reverse">
          <div className="w-full px-4 lg:w-1/2">
            <SectionTitle
              title="Nurse"
              paragraph="Professional nursing care for both mother and baby, including health check-ups, counseling, and emotional support."
              mb="44px"
            />
            <div className="mx-[-12px] flex flex-wrap">
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Routine mother check-ups" />
                <List text="Baby’s health monitoring" />
                <List text="Lactation guidance" />
              </div>
              <div className="w-full px-3 sm:w-1/2 lg:w-full xl:w-1/2">
                <List text="Counseling & mental health support" />
                <List text="Postpartum recovery tracking" />
              </div>
            </div>
          </div>
          <div className="w-full px-4 lg:w-1/2">
            <div className="relative mx-auto aspect-[25/24] max-w-[500px] lg:ml-0">
              <Image
                src="/images/about/job-06.jpg"
                alt="Nurse"
                fill
                className="rounded-lg object-cover drop-shadow-lg"
              />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default Services;
