import { motion } from "framer-motion";

const LoadingSpinner = ({ text = "Loading...", size = 80 }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-base-200 px-4">
      {/* Spinner */}
      <motion.div
        className="relative"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
        style={{ width: size, height: size }}
      >
        {/* Outer ring */}
        <div
          className="absolute inset-0 rounded-full border-t-4 border-primary border-solid"
        ></div>
        {/* Inner ring */}
        <div
          className="absolute inset-2 rounded-full border-b-4 border-secondary border-solid opacity-75"
        ></div>
      </motion.div>

      {/* Animated Text */}
      <motion.p
        className="mt-6 text-lg font-medium text-base-content"
        animate={{ opacity: [0.5, 1, 0.5] }}
        transition={{ repeat: Infinity, duration: 1.5 }}
      >
        {text}
      </motion.p>
    </div>
  );
};

export default LoadingSpinner;
