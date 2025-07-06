// src/utils/jwt.js
import axios from "axios";
import { toast } from "react-toastify";

export const getJwtToken = async (email) => {
  try {
    const response = await axios.post("https://carrer-code-server-two.vercel.app/jwt", { email });
    const token = response.data.token;
    if (token) {
      localStorage.setItem("token", token);
      return true;
    } else {
      throw new Error("Token not found in response");
    }
  } catch (error) {
    console.error("Failed to get JWT token", error);
    toast.error("JWT token fetch failed");
    return false;
  }
};
