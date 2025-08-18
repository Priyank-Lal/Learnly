import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import GoalContext from "./context/GoalContext.jsx";
import { Toaster } from "@/components/ui/sonner";

createRoot(document.getElementById("root")).render(
  <GoalContext>
    <BrowserRouter>
      <App />
      <Toaster />
    </BrowserRouter>
  </GoalContext>
);
