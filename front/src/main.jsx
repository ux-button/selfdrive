import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { RootPage } from "./pages/RootPage.jsx";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { LogInPage } from "./pages/LogInPage.jsx";
import { Context } from "./Context.jsx";

import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <RootPage />,
  },
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/log-in",
    element: <LogInPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </StrictMode>
);
