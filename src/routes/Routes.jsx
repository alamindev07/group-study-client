import { createBrowserRouter } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import CreateAssignment from "../pages/CreateAssignment";
import Assignments from "../pages/Assignments";
import MyAssignments from "../pages/MyAssignments";
import PrivateRoute from "./PrivateRoute";
import UpdateAssignment from "../pages/UpdateAssignment";
import AssignmentDetails from "../pages/AssignmentDetails";
import PendingAssignments from "../pages/PendingAssignments";
import ErrorPage from "../pages/ErrorPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    errorElement: <Error />,
    children: [
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/register", element: <Register /> },
      {
        path: "/create-assignment",
        element: (
          <PrivateRoute>
            <CreateAssignment />
          </PrivateRoute>
        ),
      },
      { path: "/assignments", element: <Assignments /> },
      {
        path: "/my-assignments",
        element: (
          <PrivateRoute>
            <MyAssignments />
          </PrivateRoute>
        ),
      },
      {
        path: "/update-assignment/:id",
        element: (
          <PrivateRoute>
            <UpdateAssignment />
          </PrivateRoute>
        ),
      },
      {
        path: "/pending-assignments",
        element: (
          <PrivateRoute>
            <PendingAssignments></PendingAssignments>
          </PrivateRoute>
        ),
      },
      {
        path: "/assignments/:id",
        element: (
          <PrivateRoute>
            <AssignmentDetails />
          </PrivateRoute>
        ),
      },
      {
        path: "*",
        element: (<ErrorPage></ErrorPage>)
      },
    ],
  },
]);

export default router;
