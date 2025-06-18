import { motion } from "framer-motion";
import { FaUserFriends, FaCheckCircle, FaLaptopCode, FaQuestion } from "react-icons/fa";
import bannerImage from "../assets/banner.jpg";

const Home = () => {
  return (
    <div className="max-w-6xl mx-auto px-4 py-10 space-y-20">
      
      {/* Banner Section */}
      <motion.section
        className="text-center"
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          Welcome to <span className="text-primary">GroupStudyHub</span>
        </h1>
        <p className="text-lg text-gray-600">
          Your one-stop platform to create, submit, and evaluate assignments collaboratively.
        </p>
        <motion.img
          src={bannerImage}
          alt="Study Banner"
          className="mx-auto w-full max-w-lg mt-6 rounded-xl shadow-md"
          whileHover={{ scale: 1.05 }}
        />
      </motion.section>

      {/* Features Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
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
              className="p-6 bg-white rounded-xl shadow hover:shadow-lg transition"
              whileHover={{ scale: 1.03 }}
            >
              <div className="text-4xl text-primary mb-4">{f.icon}</div>
              <h3 className="text-xl font-semibold mb-2">{f.title}</h3>
              <p className="text-gray-600">{f.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* FAQ Section */}
      <section>
        <h2 className="text-3xl font-bold text-center mb-10">Frequently Asked Questions</h2>
        <div className="space-y-4">
          {[
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
          ].map((faq, i) => (
            <motion.div
              key={i}
              className="bg-base-200 p-4 rounded-lg"
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.4, delay: i * 0.2 }}
              viewport={{ once: true }}
            >
              <h4 className="font-semibold text-lg flex items-center gap-2">
                <FaQuestion className="text-primary" /> {faq.q}
              </h4>
              <p className="text-gray-700 mt-1">{faq.a}</p>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Home;
