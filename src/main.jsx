// import React from "react";
// import ReactDOM from "react-dom/client";
// import './index.css';
// import { RouterProvider } from "react-router-dom";
// import router from "./routes/Routes";
// import AuthProvider from "./context/AuthProvider"; 
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

// ReactDOM.createRoot(document.getElementById("root")).render(
//   <React.StrictMode>
//     <AuthProvider> 
//       <RouterProvider router={router} />
//       <ToastContainer />
//     </AuthProvider>
//   </React.StrictMode>
// );


import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import { RouterProvider } from "react-router-dom";
import router from "./routes/Routes";
import AuthProvider from "./context/AuthProvider";  // Make sure this path is correct
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
      <ToastContainer />
    </AuthProvider>
  </React.StrictMode>
);
