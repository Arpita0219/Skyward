import { motion } from "framer-motion";

const HighlightCard = ({ icon, title, value, color = "text-indigo-300" }) => {
  return (
    <motion.div
      whileHover={{
        scale: 1.03,
        y: -6,
      }}
      transition={{ duration: 0.28 }}
      className="glass rounded-3xl p-6 text-center cursor-pointer card-hover"
    >
      <div className={`text-5xl mb-4 ${color}`}>{icon}</div>

      <h3 className="text-lg text-gray-300">{title}</h3>

      <h2 className="text-3xl font-bold mt-3">{value}</h2>
    </motion.div>
  );
};

export default HighlightCard;