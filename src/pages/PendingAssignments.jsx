import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const PendingAssignments = () => {
  const [submissions, setSubmissions] = useState([]);
  const [selected, setSelected] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    fetch(`https://carrer-code-server-two.vercel.app/api/submissions/all`)
      .then((res) => res.json())
      .then((data) => {
        if (!Array.isArray(data)) {
          toast.error("Unexpected response from server");
          return;
        }
        const filtered = data.filter((s) => s.status === "pending");
        setSubmissions(filtered);
      })
      .catch((err) => {
        console.error(err);
        toast.error("Failed to load pending assignments");
      });
  }, [user?.email]);

  const handleGiveMark = async (e) => {
    e.preventDefault();
    const form = e.target;
    const obtainedMarks = form.marks.value;
    const feedback = form.feedback.value;

    try {
      const res = await fetch(
        `https://carrer-code-server-two.vercel.app/api/submissions/${selected._id}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            obtainedMarks,
            feedback,
            examinerEmail: user.email,
          }),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Marked successfully!");
        setSubmissions((prev) => prev.filter((s) => s._id !== selected._id));
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        Pending Assignments
      </h2>

      {submissions.length === 0 ? (
        <p className="text-xl text-center text-gray-500">
          No pending assignments available.
        </p>
      ) : (
        <div className="overflow-x-auto shadow rounded-lg bg-base-100">
          <table className="table w-full table-zebra">
            <thead className="bg-base-200 text-base font-semibold text-base-content text-center">
              <tr>
                <th>Title</th>
                <th>Total Marks</th>
                <th>Examinee</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {submissions.map((s) => (
                <tr
                  key={s._id}
                  className="hover:bg-base-300 text-center transition duration-200"
                >
                  <td className="font-medium">{s.title}</td>
                  <td>{s.marks}</td>
                  <td>{s.userEmail}</td>
                  <td>
                    <button
                      className="btn btn-sm btn-primary"
                      onClick={() => {
                        if (s.userEmail === user.email) {
                          toast.error("You cannot grade your own Assignment");
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
        <div className="fixed inset-0 z-50 bg-black bg-opacity-50 flex items-center justify-center px-4">
          <div className="bg-white max-w-md w-full p-6 rounded-xl shadow-xl relative">
            <h3 className="text-xl font-bold mb-4">Grade Assignment</h3>
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
