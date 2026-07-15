import { motion } from "framer-motion";
import { WiDaySunny } from "react-icons/wi";
import {
  BsGrid1X2Fill,
  BsMap,
  BsGeoAlt,
  BsBroadcast,
  BsCalendar3,
  BsGear,
} from "react-icons/bs";

const navItems = [
  { key: "dashboard", icon: <BsGrid1X2Fill /> },
  { key: "map", icon: <BsMap /> },
  { key: "locations", icon: <BsGeoAlt /> },
  { key: "radar", icon: <BsBroadcast /> },
  { key: "calendar", icon: <BsCalendar3 /> },
];

const Sidebar = ({ activeView, onSelect }) => {
  return (
    <motion.aside
      initial={{ x: -40, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="hidden md:flex flex-col items-center justify-between w-20 py-8 shrink-0 h-screen sticky top-0 border-r border-white/5"
    >
      <div className="flex flex-col items-center gap-10">
        <div className="flex flex-col items-center gap-1">
          <WiDaySunny className="text-3xl text-indigo-300" />
          <span className="text-[10px] tracking-wide text-gray-400">Weathry</span>
        </div>

        <nav className="flex flex-col gap-3">
          {navItems.map((item) => (
            <motion.button
              key={item.key}
              onClick={() => onSelect(item.key)}
              whileHover={{ scale: 1.08 }}
              whileTap={{ scale: 0.95 }}
              className={`w-11 h-11 rounded-xl flex items-center justify-center text-lg transition ${
                activeView === item.key
                  ? "bg-indigo-500/90 text-white accent-glow"
                  : "text-gray-400 hover:bg-white/5 hover:text-white"
              }`}
            >
              {item.icon}
            </motion.button>
          ))}
        </nav>
      </div>

      <button className="w-11 h-11 rounded-xl flex items-center justify-center text-lg text-gray-400 hover:bg-white/5 hover:text-white transition">
        <BsGear />
      </button>
    </motion.aside>
  );
};

export default Sidebar;