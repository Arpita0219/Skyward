import { motion } from "framer-motion";
import {
  FaGithub,
  FaLinkedin,
  FaHeart,
} from "react-icons/fa";

const Footer = () => {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5 }}
      className="glass rounded-3xl mt-16 p-6"
    >
      <div className="flex flex-col md:flex-row justify-between items-center gap-5">

        {/* Left */}

        <div>
          <h2 className="text-2xl font-bold gradient-text">
            SKYWARD
          </h2>

          <p className="text-gray-300 mt-2">
            Modern Weather Dashboard
          </p>
        </div>

        {/* Center */}

        <div className="text-center">
          <p className="text-gray-300 flex items-center gap-2">
            Made with
            <FaHeart className="text-red-500 animate-pulse" />
            using React, Tailwind CSS & OpenWeather API
          </p>
        </div>

        {/* Right */}

        <div className="flex gap-4">

          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            className="glass p-3 rounded-full"
          >
            <FaGithub size={22} />
          </motion.a>

          <motion.a
            whileHover={{ scale: 1.2 }}
            href="#"
            className="glass p-3 rounded-full"
          >
            <FaLinkedin size={22} />
          </motion.a>

        </div>

      </div>
    </motion.footer>
  );
};

export default Footer;