import { motion } from "framer-motion";
import { FaEnvelope, FaMapMarkerAlt, FaLaptopCode, FaGithub, FaLinkedin } from "react-icons/fa";

export default function AboutUs() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-16">
      {/* Background Accent */}
      <div
        className="absolute inset-0 z-0"
        style={{
          background: `
            radial-gradient(ellipse 80% 60% at 5% 40%, rgba(175, 109, 255, 0.25), transparent 67%),
            radial-gradient(ellipse 70% 60% at 45% 45%, rgba(255, 100, 180, 0.25), transparent 67%),
            radial-gradient(ellipse 62% 52% at 83% 76%, rgba(255, 235, 170, 0.25), transparent 63%),
            radial-gradient(ellipse 60% 48% at 75% 20%, rgba(120, 190, 255, 0.2), transparent 66%)
          `,
        }}
      ></div>

      {/* Content Card */}
      <motion.div
        className="relative z-10 max-w-4xl w-full bg-base-100/60 backdrop-blur-xl rounded-2xl shadow-lg p-8 md:p-12 border border-base-300"
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        {/* Profile Section */}
        <div className="flex flex-col md:flex-row items-center gap-8">
          {/* Profile Picture */}
          <img
            src="https://i.ibb.co.com/CpHYBKFC/1708771867435.jpg"
            alt="Alamin"
            className="w-60 h-60 rounded-full shadow-lg border-4 border-primary object-cover"
          />

          {/* Developer Info */}
          <div>
            <h1 className="text-4xl font-extrabold text-purple-600 mb-2">Md Alamin</h1>
            <p className="text-lg text-base-content/80 mb-4 flex items-center gap-2">
              <FaLaptopCode className="text-secondary" /> Frontend Web Developer
            </p>
            <p className="text-base-content/90 leading-relaxed">
              I’m a passionate frontend developer from Sherpur, Mymensingh, Bangladesh.
              Skilled in React, Tailwind CSS, and modern web technologies, I love building
              clean, user-friendly applications. My goal is to create meaningful projects
              that deliver great user experiences.
            </p>
          </div>
        </div>

        {/* Contact Information */}
        <div className="mt-8">
          <h2 className="text-2xl font-bold text-purple-500 mb-4">Contact Information</h2>
          <ul className="space-y-3">
            <li className="flex items-center gap-3">
              <FaEnvelope className="text-secondary" />
              <a href="mailto:alamin.dev07@gmail.com" className="hover:underline">
                alamin.dev07@gmail.com
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaMapMarkerAlt className="text-secondary" />
              Sherpur, Mymensingh, Bangladesh
            </li>
            <li className="flex items-center gap-3">
              <FaGithub className="text-secondary" />
              <a href="https://github.com/alamindev07" target="_blank" rel="noreferrer" className="hover:underline">
                github.com/alamin-dev
              </a>
            </li>
            <li className="flex items-center gap-3">
              <FaLinkedin className="text-secondary" />
              <a href="https://linkedin.com/in/alamindev07" target="_blank" rel="noreferrer" className="hover:underline">
                linkedin.com/in/alamin-dev
              </a>
            </li>
          </ul>
        </div>

        {/* Decorative Line */}
        <div className="mt-8 h-1 w-24 bg-gradient-to-r from-primary to-secondary rounded-full"></div>
      </motion.div>
    </section>
  );
}
