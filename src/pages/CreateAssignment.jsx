import { useState } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import PageTitle from "../components/shared/PageTitle";

const CreateAssignment = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [difficulty, setDifficulty] = useState("Easy");
  const [dueDate, setDueDate] = useState("");
  const [marks, setMarks] = useState("");
  const [thumbnail, setThumbnail] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleCreate = async (e) => {
    e.preventDefault();

    if (!title || !description || !dueDate || !marks || !thumbnail) {
      return toast.error("⚠️ All fields are required.");
    }

    if (isNaN(marks) || parseInt(marks) <= 0) {
      return toast.error("📏 Marks must be a positive number.");
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const creatorEmail = storedUser?.email;

    if (!creatorEmail) {
      return toast.error("🔒 You must be logged in to create an assignment.");
    }

    const newAssignment = {
      title,
      description,
      difficulty,
      dueDate,
      marks: parseInt(marks),
      thumbnail,
      createdAt: new Date().toISOString(),
      creatorEmail,
    };

    setLoading(true);

    try {
      const res = await fetch(
        "https://carrer-code-server-two.vercel.app/api/assignments",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAssignment),
        }
      );

      const data = await res.json();

      if (res.ok) {
        toast.success("✅ Assignment created successfully!");
        navigate("/assignments");
      } else {
        toast.error(data.message || "❌ Failed to create assignment.");
      }
    } catch (err) {
      console.error("Error:", err);
      toast.error("💥 Something went wrong. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-10 transition-colors duration-300 bg-base-100 text-base-content rounded-lg">
      <PageTitle title="Create Assignment" />

      <div className="bg-base-200 shadow-xl rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center mb-6">
          📘 Create New Assignment
        </h2>

        <form onSubmit={handleCreate} className="space-y-6">
          {/* Title */}
          <div>
            <label className="block font-semibold mb-2">Title</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter assignment title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>

          {/* Description */}
          <div>
            <label className="block font-semibold mb-2">Description</label>
            <textarea
              className="textarea textarea-bordered w-full"
              rows="4"
              placeholder="Write a short description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
            ></textarea>
          </div>

          {/* Marks & Thumbnail */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Total Marks</label>
              <input
                type="number"
                className="input input-bordered w-full"
                placeholder="e.g. 100"
                value={marks}
                onChange={(e) => setMarks(e.target.value)}
                required
              />
            </div>

            <div>
              <label className="block font-semibold mb-2">Thumbnail URL</label>
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Image link"
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Thumbnail Preview */}
          {thumbnail && (
            <img
              src={thumbnail}
              alt="Preview"
              className="w-full h-48 object-cover rounded-lg shadow-md border border-base-300"
            />
          )}

          {/* Difficulty & Due Date */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block font-semibold mb-2">Difficulty</label>
              <select
                className="select select-bordered w-full"
                value={difficulty}
                onChange={(e) => setDifficulty(e.target.value)}
              >
                <option value="Easy">Easy 🟢</option>
                <option value="Intermediate">Intermediate 🟡</option>
                <option value="Hard">Hard 🔴</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold mb-2">Due Date</label>
              <input
                type="date"
                className="input input-bordered w-full"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
              />
            </div>
          </div>

          {/* Submit */}
          <button
            type="submit"
            className={`btn w-full text-lg font-semibold transition-all duration-300 ${
              loading ? "btn-disabled" : "btn-secondary hover:scale-105"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              "🚀 Create Assignment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
