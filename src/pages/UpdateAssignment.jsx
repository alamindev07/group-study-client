import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import PageTitle from "../components/shared/PageTitle";

const UpdateAssignment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [assignment, setAssignment] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    thumbnail: "",
    marks: "",
    difficulty: "",
    dueDate: "",
  });

  const user = JSON.parse(localStorage.getItem("user"));
  const userEmail = user?.email;

  useEffect(() => {
    fetch(`https://carrer-code-server-two.vercel.app/api/assignments/${id}`)
      .then((res) => {
        if (!res.ok) {
          throw new Error("Assignment not found");
        }
        return res.json();
      })
      .then((data) => {
        if (data.creatorEmail !== userEmail) {
          toast.error("You are not the creator of this assignment.");
          navigate("/assignments");
        } else {
          setAssignment(data);
          setFormData({
            title: data.title,
            thumbnail: data.thumbnail,
            marks: data.marks,
            difficulty: data.difficulty,
            dueDate: data.dueDate?.slice(0, 10),
          });
        }
      })
      .catch((err) => {
        toast.error("Error loading assignment");
        console.error(err);
        navigate("/assignments");
      });
  }, [id, userEmail, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const updatedAssignment = {
      ...formData,
      marks: parseInt(formData.marks),
      creatorEmail: userEmail,
    };

    try {
      const res = await fetch(
        `https://carrer-code-server-two.vercel.app/api/assignments/${id}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updatedAssignment),
        }
      );

      const result = await res.json();

      if (res.ok) {
        toast.success("Assignment updated successfully!");
        navigate("/assignments");
      } else {
        toast.error(result.message || "Update failed.");
      }
    } catch (error) {
      toast.error("Server error.");
      console.error(error);
    }
  };

  if (!assignment) return <p className="text-center">Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6">

       <PageTitle title="UpdateAssignment" />
      <h2 className="text-2xl font-bold mb-6">Update Assignment</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Title"
          required
        />
        <input
          type="text"
          name="thumbnail"
          value={formData.thumbnail}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Thumbnail URL"
          required
        />
        <input
          type="number"
          name="marks"
          value={formData.marks}
          onChange={handleChange}
          className="input input-bordered w-full"
          placeholder="Total Marks"
          required
        />
        <select
          name="difficulty"
          value={formData.difficulty}
          onChange={handleChange}
          className="select select-bordered w-full"
          required
        >
          <option value="">Select Difficulty</option>
          <option value="Easy">Easy</option>
          <option value="Intermediate">Intermediate</option>
          <option value="Hard">Hard</option>
        </select>
        <input
          type="date"
          name="dueDate"
          value={formData.dueDate}
          onChange={handleChange}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Update Assignment
        </button>
      </form>
    </div>
  );
};

export default UpdateAssignment;
