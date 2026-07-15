import { motion } from "framer-motion";
import { getMeteoIcon } from "../utils/meteoIcons";

const icons = [
  { src: getMeteoIcon("10d"), delay: 0 },    // rain
  { src: getMeteoIcon("13d"), delay: 0.15 }, // snow
  { src: getMeteoIcon("03d"), delay: 0.3 },  // cloud
];

const Loading = () => {
  return (
    <div className="fixed inset-0 flex flex-col items-center justify-center bg-[#0a0a12]">
      <div className="flex items-end gap-6">
        {icons.map((icon, i) => (
          <motion.img
            key={i}
            src={icon.src}
            alt=""
            className="w-16 h-16"
            animate={{ y: [0, -22, 0] }}
            transition={{
              duration: 0.9,
              repeat: Infinity,
              ease: "easeInOut",
              delay: icon.delay,
            }}
          />
        ))}
      </div>

      <motion.p
        className="mt-8 text-gray-400 text-sm tracking-wide"
        animate={{ opacity: [0.4, 1, 0.4] }}
        transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
      >
        Fetching weather...
      </motion.p>
    </div>
  );
};

export default Loading;