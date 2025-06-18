import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";

const AssignmentDetails = () => {
  const { id } = useParams();
  const [assignment, setAssignment] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`http://localhost:5000/api/assignments/${id}`)
      .then(res => res.json())
      .then(data => setAssignment(data))
      .catch(err => {
        console.error(err);
        toast.error("Failed to load assignment");
      });
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const form = e.target;
    const googleDocLink = form.googleDocLink.value;
    const quickNote = form.quickNote.value;

    const submission = {
      assignmentId: id,
      userEmail: user?.email,
      googleDocLink,
      quickNote,
      status: "pending",
      submittedAt: new Date().toISOString()
    };

    try {
      const res = await fetch(`http://localhost:5000/api/submissions`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submission)
      });

      const data = await res.json();
      if (res.ok) {
        toast.success("Assignment submitted successfully!");
        setShowModal(false);
      } else {
        toast.error(data.message || "Submission failed");
      }
    } catch (err) {
      toast.error("Server error");
      console.error(err);
    }
  };

  if (!assignment) return <p className="text-center py-10 text-lg">Loading...</p>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <div className="bg-base-100 shadow-lg rounded-lg overflow-hidden p-4 md:p-6">
        <h2 className="text-2xl font-bold text-center mb-4">{assignment.title}</h2>

        <div className="flex flex-col md:flex-row gap-6 items-center">
          <img
            src={assignment.thumbnail}
            alt="Assignment"
            className="w-full md:w-1/2 rounded object-cover shadow-md"
          />

          <div className="flex-1 space-y-3 text-sm md:text-base">
            <p><strong>Marks:</strong> {assignment.marks}</p>
            <p><strong>Difficulty:</strong> {assignment.difficulty}</p>
            <p><strong>Due Date:</strong> {assignment.dueDate?.slice(0, 10)}</p>
            <button
              onClick={() => setShowModal(true)}
              className="btn btn-primary mt-4 w-full sm:w-auto"
            >
              Take Assignment
            </button>
          </div>
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <dialog open className="modal modal-open">
          <div className="modal-box w-full max-w-lg">
            <form onSubmit={handleSubmit} className="space-y-4">
              <h3 className="text-xl font-semibold mb-2">Submit Assignment</h3>

              <input
                type="url"
                name="googleDocLink"
                className="input input-bordered w-full"
                placeholder="Google Docs Link"
                required
              />
              <textarea
                name="quickNote"
                className="textarea textarea-bordered w-full"
                placeholder="Write a quick note..."
                required
              />
              <div className="modal-action flex justify-end gap-3">
                <button type="submit" className="btn btn-success">Submit</button>
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </dialog>
      )}
    </div>
  );
};

export default AssignmentDetails;
