export const getJWT = async (email) => {
  try {
    const res = await fetch("http://localhost:5000/jwt", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();
    if (data.token) {
      localStorage.setItem("token", data.token);
    }
  } catch (error) {
    console.error("JWT fetch error:", error.message);
  }
};
