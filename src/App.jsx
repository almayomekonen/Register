import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Authorization/Register/Register";
import Login from "./Components/Authorization/Login/Login";

const router = createBrowserRouter([
  { path: "/", element: <Register /> },
  { path: "/login", element: <Login /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
