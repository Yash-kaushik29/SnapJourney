import { motion } from "framer-motion";

const cities = [
  { name: "Paris", img: "/paris.jpg" },
  { name: "New York", img: "/newyork.jpg" },
  { name: "Tokyo", img: "/tokyo.jpg" },
  { name: "London", img: "/london.jpg" },
  { name: "Rome", img: "/rome.jpg" },
  { name: "Sydney", img: "/sydney.jpg" },
];

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } },
};

export default function PopularCities() {
  return (
    <section className="py-12 px-4 bg-neutral-100 dark:bg-gray-900 transition-colors duration-300">
      <h2 className="text-3xl md:text-4xl font-bold text-center text-purple-700 dark:text-purple-300 mb-8">
        Popular Cities to Explore
      </h2>

      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, amount: 0.3 }}
        className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-6xl mx-auto"
      >
        {cities.map(({ name, img }, index) => (
          <motion.div
            key={index}
            variants={item}
            className="relative rounded-xl overflow-hidden shadow-lg cursor-pointer hover:scale-105 transition-transform duration-300 bg-white dark:bg-gray-800"
          >
            <img
              src={img}
              alt={name}
              className="w-full h-48 md:h-56 object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
              <h3 className="text-white text-xl md:text-2xl font-semibold drop-shadow-md">
                {name}
              </h3>
            </div>
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
