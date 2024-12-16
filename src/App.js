import "./App.css";
import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Homepage from "./pages/HomePage/Homepage";
import ItemDetails from "./pages/ItemDetails/ItemDetails";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/userDetails/:data" element={<ItemDetails />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
