import { motion } from "framer-motion";
import { getClimatePhoto, getOverlay } from "../utils/climateTheme";

const RainLayer = () => (
  <div className="absolute inset-0 overflow-hidden opacity-50">
    {Array.from({ length: 40 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute w-[1.5px] bg-gradient-to-b from-sky-200/0 via-sky-200/70 to-sky-200/0"
        style={{ left: `${Math.random() * 100}%`, height: `${60 + Math.random() * 60}px` }}
        initial={{ top: "-10%" }}
        animate={{ top: "110%" }}
        transition={{ duration: 0.6 + Math.random() * 0.5, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
      />
    ))}
  </div>
);

const SnowLayer = () => (
  <div className="absolute inset-0 overflow-hidden opacity-70">
    {Array.from({ length: 30 }).map((_, i) => (
      <motion.div
        key={i}
        className="absolute rounded-full bg-white/80"
        style={{ left: `${Math.random() * 100}%`, width: `${2 + Math.random() * 3}px`, height: `${2 + Math.random() * 3}px` }}
        initial={{ top: "-5%" }}
        animate={{ top: "105%", x: [0, 15, -15, 0] }}
        transition={{
          top: { duration: 8 + Math.random() * 6, repeat: Infinity, ease: "linear", delay: Math.random() * 5 },
          x: { duration: 4, repeat: Infinity, ease: "easeInOut" },
        }}
      />
    ))}
  </div>
);

const ThunderFlash = () => (
  <motion.div
    className="absolute inset-0 bg-white pointer-events-none"
    animate={{ opacity: [0, 0, 0, 0.18, 0, 0.06, 0] }}
    transition={{ duration: 5, repeat: Infinity, repeatDelay: Math.random() * 4 + 2, ease: "easeOut" }}
  />
);

const AnimatedBackground = ({ condition = "Clear", temp = 25 }) => {
  const photoUrl = getClimatePhoto(condition, temp);

  return (
    <motion.div
      key={photoUrl}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.9 }}
      className="fixed inset-0 -z-10 overflow-hidden"
      style={{
        backgroundImage: `${getOverlay()}, url('${photoUrl}')`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundAttachment: "fixed",
      }}
    >
      {(condition === "Rain" || condition === "Drizzle") && <RainLayer />}
      {condition === "Thunderstorm" && (
        <>
          <RainLayer />
          <ThunderFlash />
        </>
      )}
      {condition === "Snow" && <SnowLayer />}
    </motion.div>
  );
};

export default AnimatedBackground;