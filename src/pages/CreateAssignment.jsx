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
      return toast.error("All fields are required.");
    }

    if (isNaN(marks) || parseInt(marks) <= 0) {
      return toast.error("Marks must be a positive number.");
    }

    const storedUser = JSON.parse(localStorage.getItem("user"));
    const creatorEmail = storedUser?.email;

    if (!creatorEmail) {
      return toast.error("You must be logged in to create an assignment.");
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

   

    <div className="max-w-xl mx-auto px-4 py-10">
      
       <PageTitle title="CreateAssignment" />


      <div className="bg-white shadow-2xl rounded-2xl p-6 md:p-10">
        <h2 className="text-3xl font-bold text-center text-blue-600 mb-6">
          📘 Create New Assignment
        </h2>

        <form onSubmit={handleCreate} className="space-y-4">
          <input
            type="text"
            className="input input-bordered w-full focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            placeholder="Assignment Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />

          <textarea
            className="textarea textarea-bordered w-full focus:ring-2 focus:ring-blue-400 transition-all duration-200"
            rows="4"
            placeholder="Assignment Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>

          <input
            type="number"
            className="input input-bordered w-full"
            placeholder="Total Marks"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />

          <input
            type="text"
            className="input input-bordered w-full"
            placeholder="Thumbnail Image URL"
            value={thumbnail}
            onChange={(e) => setThumbnail(e.target.value)}
            required
          />

          {thumbnail && (
            <img
              src={thumbnail}
              alt="Thumbnail Preview"
              className="w-full h-40 object-cover rounded-lg shadow"
            />
          )}

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

          <button
            type="submit"
            className={`btn w-full transition-all duration-200 ${
              loading ? "btn-disabled" : "btn-primary"
            }`}
            disabled={loading}
          >
            {loading ? (
              <span className="loading loading-spinner text-white"></span>
            ) : (
              "Create Assignment"
            )}
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateAssignment;
