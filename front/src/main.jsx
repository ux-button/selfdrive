import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { SignUpPage } from "./pages/SignUpPage.jsx";
import { LogInPage } from "./pages/LogInPage.jsx";
import { NewFolderPage } from "./pages/newFolderPage.jsx";
import { Context } from "./Context.jsx";
import "./index.css";
import { DynamicPage } from "./pages/DynamicPage.jsx";
import { SharePage } from "./pages/SharePage.jsx";

const router = createBrowserRouter([
  {
    path: "/sign-up",
    element: <SignUpPage />,
  },
  {
    path: "/log-in",
    element: <LogInPage />,
  },
  {
    path: "/new",
    element: <NewFolderPage />,
  },
  {
    path: "/~share/*",
    element: <SharePage />,
  },
  {
    path: "/*",
    element: <DynamicPage />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Context>
      <RouterProvider router={router} />
    </Context>
  </StrictMode>
);
