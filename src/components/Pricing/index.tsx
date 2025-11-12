"use client";
import { useState } from "react";
import SectionTitle from "../Common/SectionTitle";
import OfferList from "./OfferList";
import PricingBox from "./PricingBox";

const Pricing = () => {
  const [isSurprisePackages, setIsSurprisePackages] = useState(true);

  return (
    <section id="pricing" className="relative z-10 py-16 md:py-20 lg:py-28">
      <div className="container">
        <SectionTitle
          title={isSurprisePackages ? "Agos Surprise Packages" : "Agos Postpartum Care Packages"}
          paragraph={
            isSurprisePackages
              ? "Celebrate motherhood with our unique surprise packages designed to bring joy, love, and comfort to new mothers and families."
              : "Choose from our specialized postpartum care packages designed to support mothers and families during the recovery and bonding journey."
          }
          center
          width="665px"
        />

        {/* Toggle */}
        <div className="w-full">
          <div className="mb-8 flex justify-center md:mb-12 lg:mb-16">
            <span
              onClick={() => setIsSurprisePackages(true)}
              className={`${
                isSurprisePackages
                  ? "pointer-events-none text-primary"
                  : "text-dark dark:text-white"
              } mr-4 cursor-pointer text-base font-semibold`}
            >
              Surprise Packages
            </span>

            <div
              onClick={() => setIsSurprisePackages(!isSurprisePackages)}
              className="flex cursor-pointer items-center"
            >
              <div className="relative">
                <div className="h-5 w-14 rounded-full bg-[#1D2144] shadow-inner"></div>
                <div
                  className={`${
                    isSurprisePackages ? "" : "translate-x-full"
                  } shadow-switch-1 absolute left-0 top-[-4px] flex h-7 w-7 items-center justify-center rounded-full bg-primary transition`}
                >
                  <span className="active h-4 w-4 rounded-full bg-white"></span>
                </div>
              </div>
            </div>

            <span
              onClick={() => setIsSurprisePackages(false)}
              className={`${
                isSurprisePackages
                  ? "text-dark dark:text-white"
                  : "pointer-events-none text-primary"
              } ml-4 cursor-pointer text-base font-semibold`}
            >
              Postpartum Care Packages
            </span>
          </div>
        </div>

        {/* Packages */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-10 md:grid-cols-2 lg:grid-cols-3">
          {isSurprisePackages ? (
          <>
            {/* Home Decor Packages */}
            <PricingBox
              packageName="Home Decor"
              subtitle="Elegant space with beautifully arranged floor and floral decorations."
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  15,000 ETB
                </span>
              </div>
              <OfferList text="Bedroom" status="active" />
              <OfferList text="Floor" status="active" />
              <OfferList text="Corridor" status="active" />
              <OfferList text="Salon Decoration" status="active" />
            </PricingBox>

            <PricingBox
              packageName="Home Decor Deluxe"
              subtitle="Featuring large fresh flower arrangements and celebration cake."
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  20,000 ETB
                </span>
              </div>
              <OfferList text="Home Decor (Bedroom, Corridor & Salon)" status="active" />
              <OfferList text="Large Flower Arrangement (Bouquet + Floor Decoration)" status="active" />
              <OfferList text="2 Kg Normal Cake" status="active" />
            </PricingBox>

            <PricingBox
              packageName="Home Decor Premium"
              subtitle="Including Agober rental and a custom celebration cake."
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-pink-500 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  25,000 ETB
                </span>
              </div>
              <OfferList text="Home Decor (Bedroom, Corridor & Salon)" status="active" />
              <OfferList text="Bedroom decor with Agober rent for 2 weeks" status="active" />
              <OfferList text="Large Flower Arrangement (Bouquet + Floor Decoration)" status="active" />
              <OfferList text="2 Kg Custom Made Cake" status="active" />
            </PricingBox>

            {/* Limousine Packages */}
            <PricingBox
              packageName="The Grand Arrival"
              subtitle=" Special limousine service for new mothers"
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  25,000 ETB
                </span>
              </div>
              <OfferList text="Make the entrance unforgettable with our exclusive limousine service — a grand and elegant ride home for the new mother." status="active" />
            </PricingBox>

            <PricingBox
              packageName="Special Arrival"
              subtitle="Exclusive limousine service."
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  30,000 ETB
                </span>
              </div>
              <OfferList
                text="Make the entrance unforgettable with our special limousine service — a luxurious and heartwarming ride home for the new mother."
                status="active"
              />
            </PricingBox>

            <PricingBox
              packageName="Royal Welcome"
              subtitle="Unforgettable homecoming with our premium limousine service."
            >
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-yellow-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  35,000 ETB
                </span>
              </div>
              <OfferList
                text="Step into elegance: arrive in a luxury limousine — a truly regal welcome home."
                status="active"
              />
            </PricingBox>

            {/* Photography Packages  */}
            <PricingBox
              packageName="Digital Photography"
              subtitle="Capture every precious moment with professional photography."
            >
              {/* Price Section */}
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-green-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  10,000 ETB
                </span>
              </div>

              {/* Offer List */}
              <OfferList
                text="All photos delivered in soft copy (no physical album)"
                status="active"
              />
            </PricingBox>

            <PricingBox
              packageName="Standard Photography"
              subtitle="Preserve memories with printed photos in a classic album."
            >
              {/* Price Section */}
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-green-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  12,000 ETB
                </span>
              </div>

              {/* Offer List */}
              <OfferList
                text="Normal album sized photos (100 printed photos)"
                status="active"
              />
                <OfferList
                text=" Soft copy of all photos"
                status="active"
              />
            </PricingBox>

            <PricingBox
              packageName="Premium Photography"
              subtitle="Laminated photo album and soft copy of all photos for a premium keepsake."
            >
              {/* Price Section */}
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-green-400 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  15,000 ETB
                </span>
              </div>

              {/* Offer List */}
              <OfferList text="Laminated photo album (20x30 cm)" status="active" />
              <OfferList text="Soft copy of all photos" status="active" />
            </PricingBox>

          {/* Videography Packages  */}
            <PricingBox
              packageName="Videography Package"
              subtitle="Full video coverage with a professionally edited soft copy."
            >
              {/* Price Section */}
              <div className="mb-4 text-center">
                <span className="inline-block rounded-full bg-gradient-to-r from-purple-500 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
                  15,000 ETB
                </span>
              </div>

              {/* Offer List */}
              <OfferList text="Full video coverage" status="active" />
              <OfferList text="Edited video (soft copy)" status="active" />
            </PricingBox>

          </>
          ) : (
      <>
        {/* Postpartum Care Packages */}

        <PricingBox
          packageName="Full Post Partum Care / 40 Days"
          subtitle="Premium 40-day care covering all essentials for mother and family."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              95,000 ETB
            </span>
          </div>
          <OfferList text="Welcome surprise décor" status="active" />
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Certified Nanny" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Half Post Partum Care / 30 Days"
          subtitle="Enhanced 30-day care with wellness and relaxation support."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              85,000 ETB
            </span>
          </div>
          <OfferList text="Welcome surprise décor" status="active" />
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Certified Nanny" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Full Premium Care / 40 Days"
          subtitle="All-inclusive 40-day care with expert support services."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              85,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Certified Nanny" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Half Premium Care / 30 Days"
          subtitle="30-day support package for mother’s wellness and care."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              75,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Certified Nanny" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Full Standard Care / 40 Days"
          subtitle="Standard 40-day care package for mothers with essential support."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              75,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Half Standard Care / 30 Days"
          subtitle="30-day care with essential support for new mothers."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              65,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Personal Chef" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Full Basic Care / 40 Days"
          subtitle="Basic 40-day postpartum support for mother and family."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              55,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>

        <PricingBox
          packageName="Half Basic Care / 30 Days"
          subtitle="Essential 30-day support for new mothers and family care."
        >
          <div className="mb-4 text-center">
            <span className="inline-block rounded-full bg-gradient-to-r from-pink-600 to-primary px-5 py-2 text-lg font-bold text-white shadow-md">
              45,000 ETB
            </span>
          </div>
          <OfferList text="Certified Nutritionist" status="active" />
          <OfferList text="Professional Massager" status="active" />
          <OfferList text="Nurse" status="active" />
        </PricingBox>
      </>

          )}
        </div>
      </div>
    </section>
  );
};

export default Pricing;
