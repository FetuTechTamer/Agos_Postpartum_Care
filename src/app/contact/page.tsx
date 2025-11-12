import Breadcrumb from "@/components/Common/Breadcrumb";
import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Page | Agos Postpartum Care",
  description: "Get in touch with Agos Postpartum Care for support and consultations.",
};

const ContactPage = () => {
  return (
    <>
      <Breadcrumb
        pageName="Contact Page"
        description="We invite you to reach out to us with any inquiries or support related to postpartum care. Whether you have questions about our services, need guidance, or want to share your experience, our dedicated team is here to listen and assist you on your journey to wellness and recovery."
      />

      <Contact />
    </>
  );
};

export default ContactPage;