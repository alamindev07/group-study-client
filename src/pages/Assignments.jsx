import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import AssignmentList from "./AssignmentList";

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [difficulty, setDifficulty] = useState("");

  useEffect(() => {
    fetch("https://your-server.vercel.app/assignments") // Update with your backend URL later
      .then((res) => res.json())
      .then((data) => setAssignments(data));
  }, []);

  const filteredAssignments = assignments.filter((a) => {
    const matchesSearch = a.title.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesDifficulty = difficulty ? a.difficulty === difficulty : true;
    return matchesSearch && matchesDifficulty;
  });

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-6">All Assignments</h1>

      <div className="flex flex-col md:flex-row justify-between gap-4 mb-6">
        <input
          type="text"
          placeholder="Search by title..."
          className="input input-bordered w-full md:w-1/2"
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select
          className="select select-bordered w-full md:w-1/4"
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="">All Difficulties</option>
          <option value="Easy">Easy</option>
          <option value="Medium">Medium</option>
          <option value="Hard">Hard</option>
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredAssignments.map((assignment) => (
          <div key={assignment._id} className="card bg-base-100 shadow-md">
            <div className="card-body">
              <h2 className="card-title">{assignment.title}</h2>
              <p>Difficulty: <span className="font-medium">{assignment.difficulty}</span></p>
              <p>Marks: {assignment.marks}</p>
              <div className="card-actions justify-end mt-4">
                <Link to={`/assignment/${assignment._id}`} className="btn btn-primary btn-sm">
                  View Details
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* display here all assignmnet list */}
      <AssignmentList></AssignmentList>
    </div>
  );
};

export default Assignments;
