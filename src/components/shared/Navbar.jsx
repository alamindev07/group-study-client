// import { Link, NavLink } from "react-router-dom";
// import { useContext } from "react";
// import { AuthContext } from "../../context/AuthProvider";
// import { toast } from "react-toastify";

// const Navbar = () => {
//   const { user, logout } = useContext(AuthContext);

//   const handleLogout = async () => {
//     try {
//       await logout();
//       toast.success("Logged out successfully!");
//     } catch (err) {
//       toast.error("Error during logout.");
//     }
//   };

//   const navLinks = (
//     <>
//       <li>
//         <NavLink to="/">Home</NavLink>
//       </li>
//       <li>
//         <NavLink to="/assignments">Assignments</NavLink>
//       </li>
//       {user && (
//         <>
//           <li>
//             <NavLink to="/create-assignment">Create Assignment</NavLink>
//           </li>
//           <li>
//             <NavLink to="/my-assignments">My Assignments</NavLink>
//           </li>
//           <li>
//             <NavLink to="/pending-assignments">Pending Assignments</NavLink>
//           </li>
//         </>
//       )}
//     </>
//   );

//   return (
//     <div className="bg-base-200">
//       <div className="navbar container mx-auto px-4 py-3">
//         <div className="navbar-start">
//           <Link to="/" className="text-xl font-bold">
//             📚 GroupStudyHub
//           </Link>
//         </div>

//         <div className="navbar-center hidden md:flex">
//           <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
//         </div>

//         <div className="navbar-end">
//           {user ? (
//             <div className="dropdown dropdown-end">
//               <div
//                 tabIndex={0}
//                 className="mt-4 z-[1] btn btn-ghost btn-circle avatar tooltip"
//                 data-tip={user.displayName || "User"}
//               >
//                 <div className="w-10 rounded-full">
//                   <img src={user.photoURL || "/default-user.png"} />
//                 </div>
//               </div>
//               <ul
//                 tabIndex={0}
//                 className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
//               >
//                 <li>
//                   <button onClick={handleLogout} className="btn btn-primary">Logout</button>
//                 </li>
//               </ul>
//             </div>
//           ) : <>
//           <Link to="/login" className="btn btn-outline btn-sm mr-4">
//               Login
//             </Link>
//             <Link to="/register" className="btn btn-outline btn-sm">
//               Register
//             </Link>
//           </> }
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Navbar;



import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-toastify";

const Navbar = () => {
  const { user, logout } = useContext(AuthContext);

  const handleLogout = async () => {
    try {
      await logout();
      toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error during logout.");
    }
  };

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className="font-medium" end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/assignments" className="font-medium">
          Assignments
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/create-assignment" className="font-medium">
              Create Assignment
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-assignments" className="font-medium">
              My Assignments
            </NavLink>
          </li>
          <li>
            <NavLink to="/pending-assignments" className="font-medium">
              Pending Assignments
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-100 shadow sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Navbar Start (Logo + Mobile menu) */}
        <div className="navbar-start">
          <div className="dropdown md:hidden">
            <label tabIndex={0} className="btn btn-ghost btn-circle">
              <svg
                className="h-5 w-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            </label>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-200 rounded-box w-52"
            >
              {navLinks}
              {user ? (
                <>
                  <li>
                    <button onClick={handleLogout} className="btn btn-error btn-sm">
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link to="/login" className="btn btn-outline btn-sm">
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link to="/register" className="btn btn-dash btn-error">
                      Register
                    </Link>
                  </li>
                  
                    
                </>
              )}
            </ul>
          </div>
          <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
            📚 GroupStudyHub
          </Link>
        </div>

        {/* Navbar Center (desktop menu) */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-3">{navLinks}</ul>
        </div>

        {/* Navbar End (auth area) */}
        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip"
                data-tip={user.displayName || "User"}
              >
                <div className="w-10 rounded-full ring ring-primary ring-offset-base-100 ring-offset-2">
                  <img
                    src={user.photoURL || "/default-user.png"}
                    alt="User"
                    referrerPolicy="no-referrer"
                  />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-200 rounded-box w-52"
              >
                <li>
                  <Link to="/create-assignment">Create Assignment</Link>
                </li>
                <li>
                  <Link to="/my-assignments">My Assignments</Link>
                </li>
                <li>
                  <Link to="/pending-assignments">Pending Assignments</Link>
                </li>
                <li>
                  <button onClick={handleLogout} className="btn btn-error btn-sm mt-2">
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link to="/login" className="btn btn-error btn-sm mr-2 hidden md:inline-block">
                Login
              </Link>
              <Link to="/register" className="btn btn-outline btn-sm hidden md:inline-block">
                Register
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;



