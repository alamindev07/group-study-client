
import { useState } from "react";
import { motion } from "framer-motion";
import {
  FaUserFriends,
  FaCheckCircle,
  FaLaptopCode,
  FaQuestion,
  FaStar,
  FaEnvelope,
} from "react-icons/fa";
import bannerImage from "../assets/banner.jpg";
import TechnologySlider from "../components/shared/TechnologySlider";
import PageTitle from "../components/shared/PageTitle";

const faqs = [
  { q: "How do I submit an assignment?", a: "Navigate to the assignment page, click 'Take Assignment', and submit your Google Docs link." },
  { q: "Can I edit a submitted assignment?", a: "Currently, resubmission is not allowed. Please contact your instructor for changes." },
  { q: "How will I know my assignment is graded?", a: "Graded assignments will show 'graded' status with marks and feedback in your profile." },
  { q: "Can I use GroupStudyHub for free?", a: "Yes! GroupStudyHub offers a fully free platform for students and teachers." },
  { q: "Is there a dark mode available?", a: "Yes! You can toggle between light and dark modes using the theme switcher." },
];


const testimonials = [
  {
    name: "Babu",
    role: "Computer Science Student",
    text: "GroupStudyHub made collaborating with my classmates super easy. The design is intuitive and works perfectly in both light and dark mode!",
    img: "https://i.ibb.co.com/CpHYBKFC/1708771867435.jpg",
  },
  {
    name: "Sadd",
    role: "Student",
    text: "I love how efficiently I can track submissions and grades. The platform has boosted our productivity like never before.",
    img: "https://i.ibb.co.com/whYzwc3J/1696071462955.jpg",
  },
  {
    name: "Alamin",
    role: "Lecturer",
    text: "As a developer, I appreciate the smooth user experience. It’s fast, responsive, and built for real collaboration.",
    img: "https://i.ibb.co.com/yFywHyNp/1714129216268.jpg",
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

      <div className="max-w-7xl mx-auto px-4 space-y-14">
        
        {/* Banner Section */}
        <motion.section
          className="relative h-[400px] md:h-[500px] lg:h-[700px] w-full bg-cover bg-center rounded-xl overflow-hidden flex items-center justify-center"
          style={{ backgroundImage: `url(${bannerImage})` }}
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="absolute inset-0 bg-black/40"></div>
          <div className="relative z-10 text-center px-4 max-w-2xl">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-white">
              Welcome to <span className="text-primary">GroupStudyHub</span>
            </h1>
            <p className="text-lg text-white/90 max-w-2xl mx-auto">
              Your one-stop platform to create, submit, and evaluate assignments collaboratively.
            </p>
          </div>
        </motion.section>

        {/* Technology Slider */}
        <TechnologySlider />

        {/* Features Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Features</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {[
              { icon: <FaLaptopCode />, title: "Create Assignments", desc: "Teachers can create assignments with deadlines and total marks easily." },
              { icon: <FaUserFriends />, title: "Submit & Track", desc: "Students can submit answers and check grading status in real-time." },
              { icon: <FaCheckCircle />, title: "Evaluate Efficiently", desc: "Grade submissions with feedback and track progress instantly." },
            ].map((f, i) => (
              <motion.div
                key={i}
                className="p-6 bg-base-200 rounded-xl shadow hover:shadow-xl transition duration-300"
                whileHover={{ scale: 1.05 }}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.15 }}
              >
                <div className="text-4xl text-secondary mb-4">{f.icon}</div>
                <h3 className="text-xl font-semibold mb-2 text-base-content">{f.title}</h3>
                <p className="text-base-content/80">{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Why Choose Us */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-base-200 rounded-2xl py-12 px-6 text-center"
        >
          <h2 className="text-3xl md:text-4xl font-bold mb-6 flex justify-center items-center gap-2 text-base-content">
            <FaStar className="text-yellow-500" /> Why Choose <span className="text-primary">GroupStudyHub</span>?
          </h2>
          <p className="max-w-3xl mx-auto text-base-content/80 text-lg">
            Unlike traditional LMS platforms, GroupStudyHub is optimized for fast collaboration,
            real-time assignment tracking, and seamless grading—all designed for group-based
            academic growth.
          </p>
        </motion.section>


{/* Testimonials Section */}
<section>
  <h2 className="text-3xl font-bold text-center mb-10 text-primary">
    What Our Users Say
  </h2>

  <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
    {testimonials.map((t, i) => (
      <motion.div
        key={i}
        className="bg-base-200 dark:bg-gray-800 p-6 rounded-xl shadow-md hover:shadow-lg transition duration-300"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.4, delay: i * 0.1 }}
      >
        <div className="flex flex-col items-center text-center">
          {/* Profile Image */}
          <img
            src={t.img}
            alt={t.name}
            className="w-20 h-20 rounded-full object-cover border-4 border-primary shadow-md mb-4"
          />
          
          {/* Testimonial Text */}
          <p className="text-base-content/80 dark:text-gray-300 mb-4 italic">
            "{t.text}"
          </p>

          {/* Name & Role */}
          <h4 className="font-semibold text-base-content dark:text-white">
            {t.name}
          </h4>
          <span className="text-sm text-base-content/60 dark:text-gray-400">
            {t.role}
          </span>
        </div>
      </motion.div>
    ))}
  </div>
</section>


        {/* FAQ Section */}
        <section>
          <h2 className="text-3xl font-bold text-center mb-10 text-primary">Frequently Asked Questions</h2>
          <div className="space-y-4 max-w-3xl mx-auto">
            {faqs.map((faq, i) => (
              <motion.div
                key={i}
                className="bg-base-200 p-5 rounded-lg cursor-pointer"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: i * 0.1 }}
                viewport={{ once: true }}
                onClick={() => toggleFaq(i)}
              >
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold text-lg flex items-center gap-2 text-base-content">
                    <FaQuestion className="text-primary" /> {faq.q}
                  </h4>
                  <span className="text-xl text-base-content">{openFaq === i ? "−" : "+"}</span>
                </div>
                <div
                  className={`mt-2 text-base-content/70 transition-all duration-300 ${
                    openFaq === i ? "max-h-[200px]" : "max-h-0 overflow-hidden"
                  }`}
                >
                  {faq.a}
                </div>
              </motion.div>
            ))}
          </div>
        </section>

        {/* Newsletter Signup */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="bg-orange-400 text-primary-content py-12 px-6 rounded-2xl text-center"
        >
          <h2 className="text-3xl font-bold mb-4">Stay Updated!</h2>
          <p className="mb-6 text-primary-content/90">
            Subscribe to our newsletter for the latest updates and tips.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto ">
            <input
              type="email"
              placeholder="Enter your email"
              className="input input-bordered flex-1  bg-slate-200 text-gray-800"
            />
            <button className="btn btn-secondary flex items-center gap-2">
              <FaEnvelope /> Subscribe
            </button>
          </div>
        </motion.section>

      </div>
    </>
  );
};

export default Home;
