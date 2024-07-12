import React from "react";
import ReactDOM from "react-dom/client";
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";
import "./globals.css";
import { Root } from "@/routes/root";
import { Overlay } from "@/routes/overlay";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
  },
  {
    path: "overlay/",
    element: <Overlay />,
  }
]);

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>,
);
