

import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import { toast } from "react-toastify";
import { Eye, EyeOff } from "lucide-react";
import { FcGoogle } from "react-icons/fc";
import PageTitle from "../components/shared/PageTitle";
import { getJwtToken } from "../utils/jwt"; 


const Login = () => {
  const { login, loginWithGoogle, resetPassword } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);


  const handleSubmit = async (e) => {
  e.preventDefault();

  if (!email || !password) {
    return toast.error("Email and Password are required!");
  }

  setLoading(true);
  try {
    const userCredential = await login(email, password);
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify({ email: user.email }));

    const tokenSuccess = await getJwtToken(user.email); // check if token was stored
    if (!tokenSuccess) return; // stop here if token failed

    toast.success("Login successful!");
    navigate("/");
  } catch (error) {
    // ... same error handling as before
  } finally {
    setLoading(false);
  }
};




  const handleGoogleSignIn = async () => {
  try {
    const userCredential = await loginWithGoogle();
    const user = userCredential.user;
    localStorage.setItem("user", JSON.stringify({ email: user.email }));

    const tokenSuccess = await getJwtToken(user.email); // check if token was stored
    if (!tokenSuccess) return;

    toast.success("Google login successful!");
    navigate("/");
  } catch (error) {
    toast.error("Google login failed. Try again.");
  }
};


  const handleResetPassword = async () => {
    if (!email) {
      return toast.warn("Please enter your email to reset password.");
    }
    try {
      await resetPassword(email);
      toast.success("Password reset email sent! Check your inbox.");
    } catch (error) {
      console.log("Login error:", error);
      console.log("Error code:", error.code);
      console.error("Full Firebase Auth Error:", JSON.stringify(error, null, 2));

      if (error.code === "auth/user-not-found") {
        toast.error("No user found with this email.");
      } else if (
        error.code === "auth/wrong-password" ||
        error.code === "auth/invalid-credential"
      ) {
        toast.error("Incorrect password. Please try again.");
      } else if (error.code === "auth/invalid-email") {
        toast.error("Invalid email format.");
      } else {
        toast.error("Login failed. Please try again later.");
      }
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded shadow mt-10 animate-fade-in-login">
      <PageTitle title="Login" />
      <h2 className="text-2xl font-semibold mb-4 text-center">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Email"
          className="input input-bordered w-full"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <div className="relative">
          <input
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            className="input input-bordered w-full pr-12"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button
            type="button"
            className="absolute right-3 top-3 text-gray-500"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
          </button>
        </div>

        <div className="flex justify-end">
          <button
            type="button"
            className="text-sm text-blue-600 hover:underline"
            onClick={handleResetPassword}
          >
            Forgot Password?
          </button>
        </div>

        <button
          type="submit"
          disabled={loading}
          className="btn btn-primary w-full"
        >
          {loading ? "Logging in..." : "Login"}
        </button>
      </form>

      <button
        onClick={handleGoogleSignIn}
        className="btn btn-outline w-full mt-4 flex items-center justify-center gap-2"
      >
        <FcGoogle size={24} />
        Login with Google
      </button>

      <p className="mt-4 text-center">
        Don’t have an account?{" "}
        <Link to="/register" className="text-primary underline">
          Register here
        </Link>
      </p>
    </div>
  );
};

export default Login;
