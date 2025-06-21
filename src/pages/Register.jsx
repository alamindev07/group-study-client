import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { MdEmail, MdPerson, MdPhotoCamera } from "react-icons/md";
import { HiEye, HiEyeOff } from "react-icons/hi";
import PageTitle from "../components/shared/PageTitle";

const Register = () => {
  const { register, updateUserProfile } = useAuth(); // use `register` instead of createUser
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [photoURL, setPhotoURL] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const togglePassword = () => setShowPassword(!showPassword);

  const validatePassword = (pwd) => {
    const uppercase = /[A-Z]/.test(pwd);
    const lowercase = /[a-z]/.test(pwd);
    const minLength = pwd.length >= 6;
    return uppercase && lowercase && minLength;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validatePassword(password)) {
      return toast.error(
        "Password must be at least 6 characters and include uppercase and lowercase letters."
      );
    }

    setLoading(true);
    try {
      const result = await register(email, password);

      await updateUserProfile(name, photoURL);
      toast.success("Registration successful!");
      navigate("/login");
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 to-purple-100 px-4">
       <PageTitle title="Register" />
      <div className="bg-white shadow-2xl rounded-2xl p-8 max-w-md w-full space-y-6 animate-fade-in">
        <h2 className="text-3xl font-bold text-center text-gray-800">Register</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          {/* Name */}
          <div className="relative">
            <MdPerson className="absolute top-3.5 left-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Full Name"
              className="input input-bordered w-full pl-10"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          {/* Photo URL */}
          <div className="relative">
            <MdPhotoCamera className="absolute top-3.5 left-3 text-gray-400 text-xl" />
            <input
              type="text"
              placeholder="Photo URL (optional)"
              className="input input-bordered w-full pl-10"
              value={photoURL}
              onChange={(e) => setPhotoURL(e.target.value)}
            />
          </div>

          {/* Email */}
          <div className="relative">
            <MdEmail className="absolute top-3.5 left-3 text-gray-400 text-xl" />
            <input
              type="email"
              placeholder="Email"
              className="input input-bordered w-full pl-10"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Password with toggle */}
          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="input input-bordered w-full pl-4 pr-10"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button
              type="button"
              onClick={togglePassword}
              className="absolute right-3 top-3.5 text-xl text-gray-500"
              tabIndex={-1}
            >
              {showPassword ? <HiEyeOff /> : <HiEye />}
            </button>
          </div>

          {/* Register button */}
          <button
            type="submit"
            disabled={loading}
            className="btn btn-primary w-full"
          >
            {loading ? "Registering..." : "Register"}
          </button>
        </form>

        <p className="text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-blue-600 font-medium hover:underline">
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
