import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.tsx";
import "./index.css"; // loads both bootstrap + tailwind
import "bootstrap/dist/js/bootstrap.bundle.min.js";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import GamePage from "./components/GamePage.tsx";
import GameGrid from "./components/GameGrid.tsx";
import NotFoundPage from "./components/NotFoundPage.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { index: true, element: <GameGrid /> }, // homepage
      { path: "game/:gameSlug", element: <GamePage /> }, // detail page
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
