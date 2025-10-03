import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AssessmentFlow from "./components/AssessmentFlow";
import MethodologyPage from "./components/MethodologyPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AssessmentFlow />} />
        <Route path="/methodology" element={<MethodologyPage />} />
      </Routes>
    </Router>
  );
}

export default App;
