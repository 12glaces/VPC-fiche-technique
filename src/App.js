import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import ImageEditor from "./pages/ImageEditor/ImageEditor";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route
          path="/home"
          element={
            <ProtectedRoute>
              <Home />
            </ProtectedRoute>
          }
        />
        <Route
          path="/fiche"
          element={
            <ProtectedRoute>
              <ImageEditor />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
