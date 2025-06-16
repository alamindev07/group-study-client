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
        <NavLink to="/">Home</NavLink>
      </li>
      <li>
        <NavLink to="/assignments">Assignments</NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/create-assignment">Create Assignment</NavLink>
          </li>
          <li>
            <NavLink to="/my-assignments">My Assignments</NavLink>
          </li>
          <li>
            <NavLink to="/pending-assignments">Pending Assignments</NavLink>
          </li>
        </>
      )}
    </>
  );

  return (
    <div className="bg-base-200">
      <div className="navbar container mx-auto px-4 py-3">
        <div className="navbar-start">
          <Link to="/" className="text-xl font-bold">
            📚 GroupStudyHub
          </Link>
        </div>

        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal px-1 gap-4">{navLinks}</ul>
        </div>

        <div className="navbar-end">
          {user ? (
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                className="btn btn-ghost btn-circle avatar tooltip"
                data-tip={user.displayName || "User"}
              >
                <div className="w-10 rounded-full">
                  <img src={user.photoURL || "/default-user.png"} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
              >
                <li>
                  <button onClick={handleLogout} className="btn btn-primary">Logout</button>
                </li>
              </ul>
            </div>
          ) : <>
          <Link to="/login" className="btn btn-outline btn-sm mr-4">
              Login
            </Link>
            <Link to="/register" className="btn btn-outline btn-sm">
              Register
            </Link>
          </> }
        </div>
      </div>
    </div>
  );
};

export default Navbar;
