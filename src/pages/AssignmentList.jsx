// // src/pages/AssignmentList.jsx
// import { useEffect, useState } from "react";
// import { Link } from "react-router-dom";

// const AssignmentList = () => {
//   const [assignments, setAssignments] = useState([]);

//   useEffect(() => {
//     const stored = JSON.parse(localStorage.getItem("assignments")) || [];
//     setAssignments(stored);
//   }, []);

//   return (
//     <div className="max-w-5xl mx-auto mt-10 p-6 bg-white shadow rounded">

//       {assignments.length === 0 ? (
//         <div className="flex justify-center items-center flex-col gap-4">        <p className="text-4xl text-center text-gray-500">No assignments created yet.</p>
//         <Link
//                   to="/create-assignment"
//                   className="btn btn-sm btn-primary w-fit"
//                 >
//                   Create An Assignment
//                 </Link>
       
// </div>
//       ) : (
//         <div className="grid md:grid-cols-2 gap-6">
//           {assignments.map((assignment) => (
//             <div key={assignment.id} className="card bg-gray-100 shadow-md  p-4">
//               <div className="card-body">
//                 <h3 className="card-title text-lg font-semibold">{assignment.title}</h3>
//                 <p className="text-sm text-gray-600 mb-1">
//                   Difficulty: <span className="font-medium">{assignment.difficulty}</span>
//                 </p>
//                 <p className="text-sm text-gray-600 mb-3">
//                   Due: {new Date(assignment.dueDate).toLocaleDateString()}
//                 </p>
//                 <Link
//                   to={`/assignments/${assignment._id}`}
//                   className="btn btn-sm btn-primary w-fit"
//                 >
//                   View & Submit
//                 </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}
//     </div>
//   );
// };

// export default AssignmentList;




