import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";

const MyAssignments = () => {
  const { user } = useAuth();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user?.uid) return;
    const fetchSubmissions = async () => {
      try {
        const res = await fetch(`https://your-backend-url.com/submissions?userId=${user.uid}`);
        const data = await res.json();
        setSubmissions(data);
      } catch (err) {
        console.error("Failed to fetch submissions", err);
      } finally {
        setLoading(false);
      }
    };

    fetchSubmissions();
  }, [user]);

  if (loading) return <p>Loading your assignments...</p>;

  return (
    <div>
      <h2 className="text-2xl text-center text-green-600 font-bold">My Assignments & Submissions :</h2>
      {submissions.length === 0 ? (
       <div className="flex justify-center items-center flex-col gap-4 mt-20">        <p className="text-5xl text-center text-gray-500">No Submission Found.</p>
        
       
</div>
      ) : (
        <ul>
          {submissions.map(sub => (
            <li key={sub.id}>
              <h3>{sub.assignmentTitle}</h3>
              <p>Status: {sub.status}</p>
              <p>Submitted At: {new Date(sub.submittedAt).toLocaleString()}</p>
              {sub.marksAwarded && <p>Marks: {sub.marksAwarded}</p>}
              {/* Add more details or actions as needed */}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default MyAssignments;
