import Breadcrumb from "@/components/Common/Breadcrumb"; 
import Services from "@/components/Services";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Our Services | Agos Postpartum Care",
  description:
    "Explore the range of postpartum care services offered by Agos Postpartum Care. We provide compassionate care for mothers and families.",
};

const ServicesPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Our Services"
        description="At Agos Postpartum Care, we provide a holistic range of services designed to nurture, support, and empower mothers during their postpartum journey. Our team is dedicated to ensuring your recovery, health, and happiness."
      />

      <Services />
    </>
  );
};

export default ServicesPage;
