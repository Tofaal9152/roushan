import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { BrowserRouter } from "react-router";
import Meals from "./Meals.jsx";
import { Route, Routes } from "react-router-dom";
import IndividualMeal from "./IndividualMeal.jsx";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<App />} />
        <Route path="/meals" element={<Meals />} />
        <Route path="/meals/:id" element={<IndividualMeal />} />
      </Routes>
    </BrowserRouter>
  </StrictMode>
);
