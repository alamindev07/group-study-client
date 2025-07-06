
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axiosSecure from "../hooks/axiosSecure";
import PageTitle from "../components/shared/PageTitle";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true); // New loading state
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const storedUser = JSON.parse(localStorage.getItem("user"));
  const userEmail = storedUser?.email;

  useEffect(() => {
    axiosSecure
      .get("/api/assignments")
      .then((res) => setAssignments(res.data))
      .catch((err) => {
        console.error("Error fetching assignments:", err.message);
        toast.error("Failed to fetch assignments.");
      })
      .finally(() => setLoading(false)); // Stop loading after fetch
  }, []);

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficulty ? a.difficulty === difficulty : true;
    return matchesSearch && matchesDifficulty;
  });

  const handleDelete = async (id, creatorEmail) => {
    if (!userEmail) {
      toast.error("Please log in to delete assignments.");
      navigate("/login");
      return;
    }

    if (userEmail !== creatorEmail) {
      toast.error("You are not the creator of this assignment.");
      return;
    }

    const confirm = window.confirm("Are you sure you want to delete this assignment?");
    if (!confirm) return;

    try {
      const res = await axiosSecure.delete(`/api/assignments/${id}?email=${userEmail}`);

      if (res.status === 200) {
        toast.success("Assignment deleted successfully!");
        setAssignments(assignments.filter((a) => a._id !== id));
      } else {
        toast.error(res.data.message || "Failed to delete assignment.");
      }
    } catch (error) {
      console.error("Delete error:", error);
      toast.error("Server error while deleting.");
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <PageTitle title="Assignments" />
      <h1 className="text-3xl font-bold text-center mb-6">All Assignments</h1>
      <p className="text-xs lg:text-lg text-red-500 text-center mb-6">
        <span className="text-black">Note:</span> When you create an Assignment with your logged-in email, only then will you get Update and Delete options.
      </p>

      {/*  Spinner when loading */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <span className="loading loading-spinner loading-lg text-primary"></span>
        </div>
      ) : (
        <>
          <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
            <input
              type="text"
              placeholder="Search by title..."
              className="input input-bordered w-full md:w-1/2"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <select
              className="select select-bordered w-full md:w-1/4"
              value={difficulty}
              onChange={(e) => setDifficulty(e.target.value)}
            >
              <option value="">All Difficulties</option>
              <option value="Easy">Easy</option>
              <option value="Intermediate">Intermediate</option>
              <option value="Hard">Hard</option>
            </select>
          </div>

          {filteredAssignments.length === 0 ? (
            <div className="text-center py-10">
              <p className="text-3xl font-semibold mb-4 text-red-500">
                No Assignment Found.
              </p>
              <button
                className="btn btn-primary"
                onClick={() => navigate("/create-assignment")}
              >
                Create an Assignment
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredAssignments.map((assignment) => (
                <div
                  key={assignment._id}
                  className="card bg-base-300 shadow-md hover:shadow-xl transition-shadow duration-300"
                >
                  <div className="card-body">
                    <h2 className="card-title text-center text-xl font-bold">
                      {assignment.title}
                    </h2>
                    <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-2">
                      <img
                        className="w-36 h-36 rounded-md object-cover"
                        src={assignment.thumbnail}
                        alt="Assignment Thumbnail"
                      />
                      <div className="text-sm space-y-3">
                        <p>
                          <strong>Total Marks:</strong> {assignment.marks}
                        </p>
                        <p>
                          <strong>Difficulty:</strong>{" "}
                          <span className="font-medium">{assignment.difficulty}</span>
                        </p>
                        <p>
                          <strong>Due Date:</strong>{" "}
                          {new Date(assignment.dueDate).toLocaleDateString()}
                        </p>
                        <p className="text-gray-500">
                          <strong>Created by:</strong> {assignment.creatorEmail}
                        </p>
                      </div>
                    </div>

                    <div className="card-actions justify-between mt-4 flex-wrap">
                      <Link
                        to={`/assignments/${assignment._id}`}
                        className="btn btn-primary btn-sm"
                      >
                        View
                      </Link>

                      {userEmail === assignment.creatorEmail && (
                        <>
                          <Link
                            to={`/update-assignment/${assignment._id}`}
                            className="btn btn-success btn-sm"
                          >
                            Update
                          </Link>
                          <button
                            onClick={() =>
                              handleDelete(assignment._id, assignment.creatorEmail)
                            }
                            className="btn btn-error btn-sm"
                          >
                            Delete
                          </button>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Assignments;
