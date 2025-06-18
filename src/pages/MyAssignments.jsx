

import { useEffect, useState } from "react";

const MyAssignments = () => {
  const user = JSON.parse(localStorage.getItem("user"));
  const [mySubmissions, setMySubmissions] = useState([]);

  useEffect(() => {
    if (!user?.email) return;

    fetch(`http://localhost:5000/api/submissions?email=${user.email}`)
      .then((res) => res.json())
      .then((data) => {
        setMySubmissions(data);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [user.email]);

  return (
    <div className="max-w-6xl mx-auto p-6">
      <h2 className="text-2xl font-bold mb-4 text-center">My Assignments</h2>

      {mySubmissions.length === 0 ? (
        <p className="text-gray-100 text-2xl">No assignments submitted yet.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="table w-full table-zebra">
            <thead>
              <tr className="text-xl font-bold text-center">
                <th>Ser No</th>
                <th>Title</th>
                <th>Obtained Marks</th>
                <th>Examiner Feedback</th>
                <th>Submitted At</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {mySubmissions.map((s, index) => (
                <tr className="text-center" key={s._id}>
                  <td>{index +1 || "Untitled"}</td>
                  <td>{s.title || "Untitled"}</td>
                 
                  <td>{s.status === "graded" ? s.obtainedMarks : "-"}</td>
                  <td>{s.status === "graded" ? s.feedback : "-"}</td>
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



