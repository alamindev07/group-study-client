

import { Link, NavLink } from "react-router-dom";
import { useContext } from "react";
import { toast } from "react-toastify";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase/firebase.config";
import { AuthContext } from "../../context/AuthProvider";
import ThemeToggle from "./ThemeToggle";

const Navbar = () => {
  const { logout } = useContext(AuthContext);
  const [user, loading] = useAuthState(auth);

  const handleLogout = async () => {
    try {
      await logout();
         localStorage.removeItem("token"); // remove JWT or token
         localStorage.removeItem("user");  //  remove stored user info

         toast.success("Logged out successfully!");
    } catch (err) {
      toast.error("Error during logout.");
    }
  };

  const navLinkStyle = ({ isActive }) =>
    isActive
      ? "font-medium bg-primary text-white rounded px-3 py-1"
      : "font-medium text-base-content px-3 py-1 hover:bg-base-300 rounded";

  const navLinks = (
    <>
      <li>
        <NavLink to="/" className={navLinkStyle} onClick={() => document.activeElement?.blur()} end>
          Home
        </NavLink>
      </li>
      <li>
        <NavLink to="/assignments" className={navLinkStyle} onClick={() => document.activeElement?.blur()}>
          Assignments
        </NavLink>
      </li>
      {user && (
        <>
          <li>
            <NavLink to="/create-assignment" className={navLinkStyle} onClick={() => document.activeElement?.blur()}>
              Create Assignment
            </NavLink>
          </li>
          <li>
            <NavLink to="/my-assignments" className={navLinkStyle} onClick={() => document.activeElement?.blur()}>
              My Assignments
            </NavLink>
          </li>
          <li>
            <NavLink to="/pending-assignments" className={navLinkStyle} onClick={() => document.activeElement?.blur()}>
              Pending Assignments
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  if (loading) {
    return (
      <div className="w-full py-10 text-center">
        <span className="loading loading-spinner loading-lg text-primary"></span>
      </div>
    );
  }

  return (
    <div className="bg-teal-200 shadow sticky top-0 z-50">
      <div className="navbar max-w-7xl mx-auto px-4">
        {/* Start */}
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
                <li>
                  <button
                    onClick={() => {
                      document.activeElement?.blur();
                      handleLogout();
                    }}
                    className="btn btn-error btn-sm"
                  >
                    Logout
                  </button>
                </li>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      className="btn btn-outline btn-sm"
                      onClick={() => document.activeElement?.blur()}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      className="btn btn-error btn-sm"
                      onClick={() => document.activeElement?.blur()}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          </div>
          <Link
            to="/"
            className="text-xl md:text-2xl font-bold text-primary ml-2"
          >
            📚 GroupStudyHub
          </Link>
        </div>

        {/* Center */}
        <div className="navbar-center hidden md:flex">
          <ul className="menu menu-horizontal gap-2">{navLinks}</ul>
        </div>

        {/* End */}
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
                  <Link to="/create-assignment" onClick={() => document.activeElement?.blur()}>
                    Create Assignment
                  </Link>
                </li>
                <li>
                  <Link to="/my-assignments" onClick={() => document.activeElement?.blur()}>
                    My Assignments
                  </Link>
                </li>
                <li>
                  <Link to="/pending-assignments" onClick={() => document.activeElement?.blur()}>
                    Pending Assignments
                  </Link>
                </li>
                <li>
                  <button
                    onClick={() => {
                      document.activeElement?.blur();
                      handleLogout();
                    }}
                    className="btn btn-error btn-sm mt-2"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <>
              <Link
                to="/login"
                className="btn btn-outline btn-sm hidden mr-2 md:inline-block"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="btn btn-outline btn-sm hidden md:inline-block"
              >
                Register
              </Link>
            </>
          )}
          <div className="ml-3">
            <ThemeToggle />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
