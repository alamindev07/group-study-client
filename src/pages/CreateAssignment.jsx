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

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate) {
      return toast.error("All fields are required.");
    }

    const newAssignment = {
      title,
      description,
      difficulty,
      dueDate,
      createdAt: new Date().toISOString(),
    };

    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/assignments", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newAssignment),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success("Assignment created successfully!");
        navigate("/assignments");
      } else {
        toast.error(data.message || "Failed to create assignment.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
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
