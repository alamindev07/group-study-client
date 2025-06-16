// src/pages/CreateAssignment.jsx
import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dueDate, setDueDate] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      return toast.error("All fields are required.");
    }

    const newAssignment = {
      id: Date.now(),
      title,
      description,
      difficulty,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);
    // Temporarily store in localStorage (simulate backend)
    const existing = JSON.parse(localStorage.getItem("assignments")) || [];
    localStorage.setItem("assignments", JSON.stringify([...existing, newAssignment]));

    toast.success("Assignment created!");
    setLoading(false);
    navigate("/assignments"); // Or wherever your list page is
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-6 rounded shadow mt-10">
      <h2 className="text-2xl font-bold mb-4 text-center">Create New Assignment</h2>
      <form onSubmit={handleCreate} className="space-y-4">
        <input
          type="text"
          className="input input-bordered w-full"
          placeholder="Assignment Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <textarea
          className="textarea textarea-bordered w-full"
          rows="4"
          placeholder="Assignment Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>

        <select
          className="select select-bordered w-full"
          value={difficulty}
          onChange={(e) => setDifficulty(e.target.value)}
        >
          <option value="Easy">Easy</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Hard">Hard</option>
        </select>

        <input
          type="date"
          className="input input-bordered w-full"
          value={dueDate}
          onChange={(e) => setDueDate(e.target.value)}
          required
        />

        <button type="submit" className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Creating..." : "Create Assignment"}
        </button>
      </form>
    </div>
  );
};

export default CreateAssignment;
