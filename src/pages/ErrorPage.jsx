import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import PageTitle from "../components/shared/PageTitle";

const ErrorPage = () => {
  return (
    <div
      className="min-h-screen flex items-center justify-center px-4"
      style={{
        background: `
          radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.12), transparent 67%),
          radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.08), transparent 67%),
          radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.1), transparent 63%),
          radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.09), transparent 66%),
          linear-gradient(135deg, var(--tw-bg-base-200), var(--tw-bg-base-300))
        `,
      }}
    >
      <PageTitle title="ErrorPage" />
      <motion.div
        className="text-center space-y-6 max-w-2xl mx-auto p-8 rounded-2xl shadow-lg bg-base-100 bg-opacity-70 backdrop-blur-sm"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        {/* Animated 404 */}
        <motion.h1
          className="text-7xl font-extrabold text-error drop-shadow-md"
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          404
        </motion.h1>

        {/* Title */}
        <h2 className="text-2xl md:text-3xl font-semibold text-base-content">
          Oops! Page Not Found
        </h2>

        {/* Description */}
        <p className="text-base md:text-lg text-base-content/70 dark:text-base-content/80 leading-relaxed">
          The page you’re looking for doesn’t exist or has been moved.  
          Double-check the address or go back to the homepage.
        </p>

        {/* Button */}
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className="flex justify-center"
        >
          <Link
            to="/"
            className="btn btn-secondary btn-wide shadow-md hover:shadow-lg transition-all duration-300"
          >
            Go Back Home
          </Link>
        </motion.div>
      </motion.div>
    </div>
  );
};

export default ErrorPage;
