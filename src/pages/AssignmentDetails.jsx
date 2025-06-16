// // src/pages/AssignmentDetails.jsx
// import { useParams } from "react-router-dom";
// import { useEffect, useState } from "react";

// const AssignmentDetails = () => {
//   const { id } = useParams();
//   const [assignment, setAssignment] = useState(null);

//   useEffect(() => {
//     fetch(`https://your-api.com/assignments/${id}`) // Update with your backend route
//       .then(res => res.json())
//       .then(data => setAssignment(data));
//   }, [id]);

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     // You will implement submission logic here later
//   };

//   if (!assignment) return <div>Loading...</div>;

//   return (
//     <div className="max-w-3xl mx-auto p-6">
//       <h2 className="text-3xl font-bold mb-4">{assignment.title}</h2>
//       <p className="mb-2"><strong>Marks:</strong> {assignment.marks}</p>
//       <p className="mb-2"><strong>Difficulty:</strong> {assignment.difficulty}</p>
//       <p className="mb-6">{assignment.description}</p>

//       <form onSubmit={handleSubmit} className="space-y-4">
//         <textarea
//           placeholder="Submit your GitHub repo link or written answer here"
//           className="textarea textarea-bordered w-full"
//           required
//         ></textarea>
//         <button type="submit" className="btn btn-primary w-full">
//           Submit Assignment
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AssignmentDetails;







import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";

const AssignmentDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [assignment, setAssignment] = useState(null);
  const [submission, setSubmission] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetch(`https://your-api.com/assignments/${id}`)
      .then(res => res.json())
      .then(data => setAssignment(data));
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!user) {
      return toast.error("You must be logged in to submit an assignment.");
    }

    if (!submission.trim()) {
      return toast.error("Please enter your submission before submitting.");
    }

    setLoading(true);

    // Prepare submission payload
    const submissionData = {
      assignmentId: id,
      userId: user.uid,
      submissionText: submission,
      submittedAt: new Date().toISOString(),
    };

    try {
      // POST submission to your backend API
      const response = await fetch("https://your-api.com/submissions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          // Add JWT token here later after backend setup
        },
        body: JSON.stringify(submissionData),
      });

      if (!response.ok) {
        throw new Error("Failed to submit assignment");
      }

      toast.success("Assignment submitted successfully!");
      setSubmission(""); // Clear the form after success
    } catch (error) {
      toast.error(error.message || "Submission failed");
    } finally {
      setLoading(false);
    }
  };

  if (!assignment) return <div>Loading...</div>;

  return (
    <div className="max-w-3xl mx-auto p-6">
      <h2 className="text-3xl font-bold mb-4">{assignment.title}</h2>
      <p className="mb-2"><strong>Marks:</strong> {assignment.marks}</p>
      <p className="mb-2"><strong>Difficulty:</strong> {assignment.difficulty}</p>
      <p className="mb-6">{assignment.description}</p>

      <form onSubmit={handleSubmit} className="space-y-4">
        <textarea
          placeholder="Submit your GitHub repo link or written answer here"
          className="textarea textarea-bordered w-full"
          value={submission}
          onChange={(e) => setSubmission(e.target.value)}
          required
        ></textarea>
        <button type="submit" disabled={loading} className="btn btn-primary w-full">
          {loading ? "Submitting..." : "Submit Assignment"}
        </button>
      </form>
    </div>
  );
};

export default AssignmentDetails;
