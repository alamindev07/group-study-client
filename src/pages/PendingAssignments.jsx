import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
   
    fetch(`http://localhost:5000/api/submissions/all`)
      .then(res => res.json())
      .then(data => {
  if (!Array.isArray(data)) {
    toast.error("Unexpected response from server");
    return;
  }

  const filtered = data.filter(s => s.status === "pending");



  setSubmissions(filtered);
})   


      .catch(err => {
        console.error(err);
        toast.error("Failed to load pending assignments");
      });
  }, [user.email]);

  const handleGiveMark = async (e) => {
    e.preventDefault();
    const form = e.target;
    const obtainedMarks = form.marks.value;
    const feedback = form.feedback.value;

    try {
      const res = await fetch(`http://localhost:5000/api/submissions/${selected._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          obtainedMarks,
          feedback,
          examinerEmail: user.email,
        }),
      });

      const result = await res.json();

      if (res.ok) {
        toast.success("Marked successfully!");
        setSubmissions(prev => prev.filter(s => s._id !== selected._id));
        setSelected(null);
      } else {
        toast.error(result.message);
      }
    } catch (error) {
      console.error(error);
      toast.error("Server error");
    }
  };

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">Pending Assignments</h2>

      {submissions.length === 0 ? (
        <p>No pending assignments available.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra w-full">
            <thead>
              <tr className="text-xl text-center font-bold">
                <th>Title</th>
                <th>Total Marks</th>
                <th>Examinee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr className="text-center" key={s._id}>
                  <td>{s.title}</td>
                  <td>{s.marks}</td>
                  <td>{s.userEmail}</td>
                  <td>
                    <button
  className="btn btn-sm btn-primary"
  onClick={() => {
    if (s.userEmail === user.email) {
      toast.error("You are not permitted to give mark in your own created assignment");
      return;
    }
    setSelected(s);
  }}
>
  Give Mark
</button>

                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow max-w-md w-full">
            <h3 className="text-xl font-semibold mb-4">Grade Assignment</h3>
            <p>
              <strong>Google Docs:</strong>{" "}
              <a
                href={selected.googleDocLink}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                View Submission
              </a>
            </p>
            <p className="mt-2">
              <strong>Note:</strong> {selected.quickNote}
            </p>

            <form onSubmit={handleGiveMark} className="mt-4 space-y-3">
              <input
                type="number"
                name="marks"
                placeholder="Obtained Marks"
                required
                className="input input-bordered w-full"
              />
              <textarea
                name="feedback"
                placeholder="Feedback"
                required
                className="textarea textarea-bordered w-full"
              />
              <div className="flex justify-end gap-2">
                <button type="submit" className="btn btn-success">
                  Submit
                </button>
                <button
                  type="button"
                  onClick={() => setSelected(null)}
                  className="btn btn-outline"
                >
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingAssignments;


