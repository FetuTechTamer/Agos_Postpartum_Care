import { Brand } from "@/types/brand";
import brandsData from "./brandsData";

const Brands = () => {
  return (
    <section className="pt-16 pb-24 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        {/* Section Title */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 dark:text-gray-100">
            Helpful Postpartum Resources
          </h2>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Explore trusted guides and tips for postpartum care and recovery
          </p>
        </div>

        {/* Cards */}
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {brandsData.map((brand) => (
            <SingleBrand key={brand.id} brand={brand} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default Brands;

const SingleBrand = ({ brand }: { brand: Brand }) => {
  const { href, name, description } = brand;

  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="group block rounded-xl bg-white dark:bg-gray-800 p-6 shadow-md hover:shadow-xl transition hover:-translate-y-1 transform"
    >
      <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-3 group-hover:text-blue-600 transition">
        {name}
      </h3>
      <p className="text-gray-600 dark:text-gray-400">{description}</p>
    </a>
  );
};
