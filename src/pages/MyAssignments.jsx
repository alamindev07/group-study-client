
import { useEffect, useState } from "react";
import PageTitle from "../components/shared/PageTitle";

const MyAssignments = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const email = user?.email || "anonymous@example.com"; // fallback email
  const [mySubmissions, setMySubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`https://carrer-code-server-two.vercel.app/api/submissions?email=${email}`)
      .then((res) => res.json())
      .then((data) => {
        setMySubmissions(data);
      })
      .catch((err) => {
        console.error("Failed to fetch submissions:", err);
      })
      .finally(() => {
        setLoading(false); // Always stop loading
      });
  }, [email]);

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
      <PageTitle title="MyAssignment" />
      <h2 className="text-3xl font-bold text-center text-primary mb-8">
        My Assignments
      </h2>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <span className="loading loading-spinner text-primary loading-lg"></span>
        </div>
      ) : mySubmissions.length === 0 ? (
        <div className="text-center py-10">
          <p className="text-lg text-gray-600">No assignments submitted yet.</p>
        </div>
      ) : (
        <div className="overflow-x-auto shadow-md rounded-lg bg-base-100">
          <table className="table table-zebra w-full">
            <thead className="bg-base-200 text-base font-semibold text-base-content">
              <tr className="text-center">
                <th>#</th>
                <th>Title</th>
                <th>Marks</th>
                <th>Feedback</th>
                <th>Submitted</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mySubmissions.map((s, index) => (
                <tr
                  key={s._id}
                  className="hover:bg-base-300 transition duration-200 text-center"
                >
                  <td>{index + 1}</td>
                  <td className="font-medium">{s.title || "Untitled"}</td>
                  <td>
                    {s.status === "graded" ? (
                      <span className="text-success font-semibold">
                        {s.obtainedMarks}
                      </span>
                    ) : (
                      "-"
                    )}
                  </td>
                  <td className="max-w-xs break-words">
                    {s.status === "graded" ? s.feedback : "-"}
                  </td>
                  <td>{new Date(s.submittedAt).toLocaleString()}</td>
                  <td>
                    <span
                      className={`badge ${
                        s.status === "graded"
                          ? "badge-success"
                          : "badge-warning"
                      }`}
                    >
                      {s.status === "graded" ? "Completed" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyAssignments;
