import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Register from "./Components/Authorization/Register/Register";
import Login from "./Components/Authorization/Login/Login";

const router = createBrowserRouter([
  { path: "/", element: <Login /> },
  { path: "/register", element: <Register /> },
]);

export default function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}
