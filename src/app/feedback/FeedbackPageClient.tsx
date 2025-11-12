"use client";

import { useState } from "react";

const FeedbackPageClient = () => {
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<"success" | "error" | "">("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const response = await fetch("http://localhost/Agos_Postpartum_Care/api/submitFeedback.php", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();

      if (data.status === "success") {
        setStatus("success");
        setMessage("Thank you! Your feedback has been submitted successfully.");
        form.reset();
      } else {
        setStatus("error");
        setMessage("Something went wrong. Please try again.");
      }

      autoClearMessage();
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
      autoClearMessage();
    }
  };

  const autoClearMessage = () => {
    setTimeout(() => {
      setMessage("");
      setStatus("");
    }, 5000);
  };

  return (
    <section className="relative z-10 overflow-hidden pt-36 pb-16 md:pb-20 lg:pt-[180px] lg:pb-28">
      <div className="container">
        <div className="mx-auto max-w-3xl shadow-three dark:bg-dark rounded-sm bg-white px-6 py-10 sm:p-[60px]">
          <h3 className="mb-3 text-center text-2xl font-bold text-black sm:text-3xl dark:text-white">
            Submit Your Feedback
          </h3>
          <p className="mb-10 text-center text-base font-medium text-body-color">
            Please provide your feedback about the service you received.
          </p>

          <form onSubmit={handleSubmit} className="grid grid-cols-1 gap-6">
            {/* Employee Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Employee Name *
              </label>
              <input
                type="text"
                name="employee_name"
                required
                placeholder="Enter employee name"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>
            
            {/* Employee ID*/}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Employee ID*
              </label>
              <input
                type="text"
                name="employee_id"
                required
                placeholder="Enter employee id"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Position */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Position *
              </label>
              <select
                name="position"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="Decor Specialist">Decor Specialist</option>
                <option value="Childcare Provider">Nany</option>
                <option value="Personal Chef">Personal Chef</option>
                <option value="Massage Therapist">Massage Therapist</option>
                <option value="Nutritionist">Nutritionist</option>
                <option value="Postpartum Nurse">Nurse</option>
              </select>
            </div>

            {/* Client Name */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Your Name *
              </label>
              <input
                type="text"
                name="client_name"     
                required
                placeholder="Enter your full name"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Client Email */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Email
              </label>
              <input
                type="email"
                name="client_email"
                placeholder="Enter your email"
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Service Date */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Service Date *
              </label>
              <input
                type="date"
                name="service_date"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>
            {/* Rating */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Rating *
              </label>
              <select
                name="rating"
                required
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              >
                <option value="1 - Poor">1 - Poor</option>
                <option value="2 - Fair">2 - Fair</option>
                <option value="3 - Good">3 - Good</option>
                <option value="4 - Very Good">4 - Very Good</option>
                <option value="5 - Excellent">5 - Excellent</option>
              </select>
            </div>


            {/* Comments */}
            <div>
              <label className="mb-2 block text-sm font-medium text-dark dark:text-white">
                Comments
              </label>
              <textarea
                name="comments"
                placeholder="Write your comments here..."
                className="border-stroke w-full rounded-xs border bg-[#f8f8f8] px-6 py-3 text-base text-body-color outline-hidden focus:border-primary dark:border-transparent dark:bg-[#2C303B] dark:text-body-color-dark"
              />
            </div>

            {/* Submit Button */}
            <div>
              <button className="bg-primary hover:bg-primary/90 w-full rounded-xs px-9 py-4 text-base font-medium text-white duration-300">
                Submit Feedback
              </button>
            </div>

            {/* Message */}
            {message && (
              <p
                className={`text-center mt-3 text-base font-medium ${
                  status === "success" ? "text-green-600" : "text-red-600"
                }`}
              >
                {message}
              </p>
            )}
          </form>
        </div>
      </div>
    </section>
  );
};

export default FeedbackPageClient;
