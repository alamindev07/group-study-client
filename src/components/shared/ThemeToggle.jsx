import { useEffect, useState } from "react";

const ThemeToggle = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.documentElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prev => (prev === "light" ? "dark" : "light"));
  };

  return (
    <button
      className="btn btn-circle btn-sm bg-base-200 hover:bg-base-300"
      onClick={toggleTheme}
      title="Toggle Theme"
    >
      {theme === "light" ? (
         <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M21 12.79A9 9 0 1111.21 3a7 7 0 109.79 9.79z" />
        </svg>
       
      ) : (
       

         <svg
          className="w-5 h-5"
          fill="currentColor"
          viewBox="0 0 24 24"
        >
          <path d="M12 3a1 1 0 011 1v1.26a1 1 0 01-2 0V4a1 1 0 011-1zm0 16.74a1 1 0 011 1V21a1 1 0 01-2 0v-1.26a1 1 0 011-1zM4.22 5.64a1 1 0 011.41 0l.89.89a1 1 0 01-1.41 1.41l-.89-.89a1 1 0 010-1.41zm12.02 12.02a1 1 0 011.41 0l.89.89a1 1 0 01-1.41 1.41l-.89-.89a1 1 0 010-1.41zM3 12a1 1 0 011-1h1.26a1 1 0 010 2H4a1 1 0 01-1-1zm16.74 0a1 1 0 011 1h1.26a1 1 0 010-2H21a1 1 0 01-1 1zM4.22 18.36a1 1 0 010-1.41l.89-.89a1 1 0 011.41 1.41l-.89.89a1 1 0 01-1.41 0zm12.02-12.02a1 1 0 010-1.41l.89-.89a1 1 0 011.41 1.41l-.89.89a1 1 0 01-1.41 0zM12 6a6 6 0 100 12A6 6 0 0012 6z" />
        </svg>
      )}
    </button>
  );
};

export default ThemeToggle;
