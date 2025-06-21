

import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserFriends,
  FaCheckCircle,
  FaLaptopCode,
  FaQuestion,
  FaStar,
} from "react-icons/fa";
import bannerImage from "../assets/banner.jpg";
import TechnologySlider from "../components/shared/TechnologySlider";
import { div } from "framer-motion/client";
import PageTitle from "../components/shared/PageTitle";

const faqs = [
  {
    q: "How do I submit an assignment?",
    a: "Navigate to the assignment page, click 'Take Assignment', and submit your Google Docs link.",
  },
  {
    q: "Can I edit a submitted assignment?",
    a: "Currently, resubmission is not allowed. Please contact your instructor for changes.",
  },
  {
    q: "How will I know my assignment is graded?",
    a: "Graded assignments will show 'graded' status with marks and feedback in your profile.",
  },
  {
    q: "Can I use GroupStudyHub for free?",
    a: "Yes, GroupStudyHub offers a fully free platform for students and teachers.",
  },
  {
    q: "Is there a dark mode available?",
    a: "Yes! You can toggle between light and dark modes using the theme switcher.",
  },
];

const Home = () => {
  const [openFaq, setOpenFaq] = useState(null);
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  return (
    
   <>

  <PageTitle title="Home" />


    <div className="max-w-7xl mx-auto px-4  space-y-10">
      {/* Banner Section with Background Image */}
<motion.section
  className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full bg-cover bg-center rounded-xl overflow-hidden flex items-center justify-center"
  style={{ backgroundImage: `url(${bannerImage})` }}
  initial={{ opacity: 0, y: -30 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 0.6 }}
>
  {/* Proper transparent black overlay */}
  <div className="absolute inset-0 bg-black/40"></div>

  {/* Text content */}
  <div className="relative z-10 text-center px-4 max-w-2xl">
    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white drop-shadow-lg">
      Welcome to <span className="text-primary">GroupStudyHub</span>
    </h1>
    <p className="text-lg text-white/90 max-w-2xl mx-auto drop-shadow">
      Your one-stop platform to create, submit, and evaluate assignments collaboratively.
    </p>
  </div>
</motion.section>



    {/* silder section this is kind of unique section */}

<TechnologySlider></TechnologySlider>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {[
            {
              icon: <FaLaptopCode />,
              title: "Create Assignments",
              desc: "Teachers can create assignments with deadlines and total marks easily.",
            },
            {
              icon: <FaUserFriends />,
              title: "Submit & Track",
              desc: "Students can submit answers and check their grading status in real-time.",
            },
            {
              icon: <FaCheckCircle />,
              title: "Evaluate Efficiently",
              desc: "Grade submissions with feedback. Auto-tracking of pending and graded items.",
            },
          ].map((f, i) => (
            <motion.div
              key={i}
              className="p-6 bg-gray-100 dark:bg-gray-800 rounded-xl shadow hover:shadow-xl transition duration-300"
              whileHover={{ scale: 1.05 }}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.15 }}
            >
              <div className="text-4xl text-primary mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-black">{f.title}</h3>
              <p className="text-gray-700 dark:text-gray-300">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Unique Section - Why Choose Us */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="bg-gradient-to-r from-blue-100 via-purple-100 to-pink-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 rounded-xl py-12 px-6 text-center"
      >
        <h2 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center items-center gap-2">
          <FaStar className="text-yellow-500" /> <span className="text-black">Why Choose{" "}</span>
          <span className="text-primary">GroupStudyHub</span>?
        </h2>
        <p className="max-w-3xl mx-auto text-gray-700 dark:text-gray-300 text-lg">
          Unlike traditional LMS platforms, GroupStudyHub is optimized for fast collaboration,
          real-time assignment tracking, and seamless grading—all designed for group-based
          academic growth.
        </p>
      </motion.section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4 max-w-3xl mx-auto">
          {faqs.map((faq, i) => (
            <motion.div
              key={i}
              className="bg-base-200 dark:bg-gray-800 p-5 rounded-lg cursor-pointer transition-all duration-300"
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.1 }}
              viewport={{ once: true }}
              onClick={() => toggleFaq(i)}
              aria-expanded={openFaq === i}
            >
              <div className="flex items-center justify-between">
                <h4 className="font-semibold text-lg flex items-center gap-2">
                  <FaQuestion className="text-primary" /> {faq.q}
                </h4>
                <span className="text-xl">{openFaq === i ? "−" : "+"}</span>
              </div>
              <div
                className={`mt-2 text-gray-700 dark:text-gray-300 transition-all duration-300 ${
                  openFaq === i ? "max-h-[200px]" : "max-h-0 overflow-hidden"
                }`}
              >
                {faq.a}
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
   
   </>
  );
};

export default Home;

